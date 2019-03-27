import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  getSingleReceiptFromServer,
  updateReceiptThunk,
  selectGroupThunk
} from '../../store'
import socket from '../../socket'
import {InlineForm, UserBalances} from '../index'
import axios from 'axios'
import {Button, Table, Segment, Icon, Popup} from 'semantic-ui-react'
import {toast} from 'react-toastify'

const popStyle = {
  borderRadius: 0,
  opacity: 0.93,
  padding: '2em',
  backgroundColor: 'whitesmoke'
}

class SocketTable extends Component {
  state = {
    data: [],
    total: 0,
    editIdx: [],
    userAmounts: {},
    focus: [],
    lock: {
      item: false,
      cost: false,
      user: false,
      addUser: false,
      delete: true
    },
    emailConfirmation: '',
    isOpen: true
  }

  async componentDidMount() {
    await this.props.getSingleReceiptFromServer(
      this.props.match.params.receiptId
    )
    await this.props.selectGroupThunk(this.props.singleReceipt.groupId)

    // filter out line items containing 'total' and 'cash'
    let lineItems = []
    this.props.singleReceipt.data.forEach((item, idx) => {
      if (
        !item.item.toLowerCase().includes('total') &&
        !item.item.toLowerCase().includes('cash')
      ) {
        lineItems.push({
          item: item.item,
          id: idx,
          cost: item.cost,
          users: item.users || [],
          delete: item.delete || false
        })
      }
    })

    // initialize state to have userAmounts with group users
    let userAmounts = this.props.singleReceipt.userAmounts
    this.props.selectedGroup.users.map(user => {
      if (!userAmounts[user.email]) {
        userAmounts[user.email] = {
          name: user.name,
          amount: 0,
          items: {}
        }
      }
    })

    // set props to state
    await this.setState({
      data: lineItems,
      userAmounts
    })

    // SOCKET LISTENERS ::
    socket.on('cell-update', newData => {
      this.setState({data: newData})
    })
    socket.on('lockChange', lockStatus => {
      this.setState({lock: lockStatus})
    })
    socket.on('updateUserAmounts', userAmounts => {
      this.setState({userAmounts})
    })
    socket.on('rowDeleted', () => {
      toast(<div>Row Deleted</div>)
    })
    ///////END componentdidmount
  }

  startEdit = (rowIdx, data) => {
    this.setState({
      editIdx: [...this.state.editIdx, rowIdx]
    })
  }
  handleOpen = () => {
    if (this.state.isOpen) this.setState({isOpen: false})
  }

  handleOpen = () => {
    if (this.state.isOpen) this.setState({isOpen: false})
  }

  saveUsers = (userEmails, rowIdx) => {
    const row = this.state.data[rowIdx]
    const rowUserEmails = row.users.map(user => user.email)
    const userEmailsDeduped = userEmails.filter(
      email => !rowUserEmails.includes(email)
    )
    if (!userEmailsDeduped[0]) return
    const newUsers = this.props.selectedGroup.users.filter(user =>
      userEmailsDeduped.includes(user.email)
    )
    const newRow = {...row, users: [...row.users, ...newUsers]}
    const newState = this.state.data
    newState[rowIdx] = newRow
    this.adjustBalances(rowIdx, newRow)
    this.setState({
      data: newState
    })

    // show everyone live update of addUser action
    socket.emit('cell-update', this.state.data)
  }

  removeUser = (userEmail, rowIdx) => {
    const row = this.state.data[rowIdx]
    const newUsers = row.users.filter(user => user.email !== userEmail)
    const newRow = {...row, users: newUsers}
    const newState = this.state.data
    newState[rowIdx] = newRow
    this.adjustBalances(rowIdx, newRow, userEmail)
    this.setState({
      data: newState
    })

    // show everyone live update of removeUser action
    socket.emit('cell-update', this.state.data)
  }

  handleEditChange = (evt, rowIdx) => {
    const row = this.state.data[rowIdx]
    const newRow = {
      ...row,
      [evt.target.name]:
        evt.target.name === 'cost' ? Number(evt.target.value) : evt.target.value
    }
    const newState = this.state.data
    newState[rowIdx] = newRow
    this.setState({
      data: newState
    })
  }

  focusMe = (num, rowIdx) => {
    this.setState({
      focus: [num, rowIdx]
    })
  }

  stopEdit = async rowIdx => {
    console.log(rowIdx)
    const newEditIdx = this.state.editIdx.filter(idx => idx !== rowIdx)
    await this.setState({
      editIdx: newEditIdx
    })

    this.adjustBalances(rowIdx, this.state.data[rowIdx])

    // save update to backend
    await this.props.updateReceiptThunk(
      {data: this.state.data, userAmounts: this.state.userAmounts},
      this.props.singleReceipt._id
    )
  }

  sumValues = obj =>
    Object.values(obj)
      .reduce((a, b) => a + b)
      .toFixed(2)

  adjustBalances = (rowIdx, newRow, userEmail) => {
    const userAmounts = this.state.userAmounts

    if (newRow.delete) {
      newRow.users.forEach(user => {
        delete userAmounts[user.email].items[rowIdx]
        if (Object.keys(userAmounts[user.email].items).length) {
          userAmounts[user.email].amount = this.sumValues(
            userAmounts[user.email].items
          )
        } else {
          userAmounts[user.email].amount = 0
        }
      })
    } else {
      newRow.users.forEach(user => {
        userAmounts[user.email].items[rowIdx] =
          newRow.cost / newRow.users.length
        userAmounts[user.email].amount = this.sumValues(
          userAmounts[user.email].items
        )
      })
      if (userEmail) {
        console.log(userEmail)
        delete userAmounts[userEmail].items[rowIdx]
        if (Object.keys(userAmounts[userEmail].items).length) {
          userAmounts[userEmail].amount = this.sumValues(
            userAmounts[userEmail].items
          )
        } else {
          userAmounts[userEmail].amount = 0
        }
      }
    }

    this.setState({
      userAmounts
    })

    // update everyone's amounts header
    socket.emit('userAmounts', this.state.userAmounts)
  }

  lockColumn = async column => {
    await this.setState({
      lock: {
        ...this.state.lock,
        [column]: !this.state.lock[column]
      }
    })

    // change locked columns for everyone
    socket.emit('cell-lock', this.state.lock)
  }

  deleteRow = rowIdx => {
    // doesn't actually delete, only hides
    const row = this.state.data[rowIdx]
    row.delete = true
    this.adjustBalances(rowIdx, row)
    this.stopEdit(rowIdx)
    toast(<div>Row Deleted</div>)
    socket.emit('deleteRow')
    socket.emit('cell-update', this.state.data)
  }

  isUploader = () =>
    this.props.singleReceipt.uploader
      ? this.props.user.email === this.props.singleReceipt.uploader.email
      : false

  submitEmail = async () => {
    this.setState({emailConfirmation: 'Sent!'})
    const obj = {
      receiptId: this.props.singleReceipt._id,
      uploader: this.props.singleReceipt.uploader.name,
      recipients: this.props.selectedGroup.users
    }
    await axios.post('/api/email/send', obj)
    toast(<div>Email Sent!</div>)
    // this.setState({emailConfirmation: ''})
  }

  submitUserAmountsEmail = async () => {
    const payers = Object.keys(this.props.singleReceipt.userAmounts)
      .filter(keys => keys !== this.props.singleReceipt.uploader.email)
      .map(payee => {
        console.log(payee)
        return `<div>${
          this.props.singleReceipt.userAmounts[payee].name
        } owes $${this.props.singleReceipt.userAmounts[payee].amount} to ${
          this.props.singleReceipt.uploader.name
        }
        </div>`
      })
      .reduce((a, b) => a.concat(b))
    console.log(payers)
    const obj = {
      receiptId: this.props.singleReceipt._id,
      groupName: this.props.selectedGroup.name,
      userAmounts: this.props.singleReceipt.userAmounts,
      uploader: this.props.singleReceipt.uploader,
      date: this.props.singleReceipt.date,
      recipients: this.props.selectedGroup.users,
      payers
    }
    console.log(obj)

    await axios.post('/api/email/sendUserAmounts', obj)
    toast(<div>Email Sent!</div>)
  }

  row = (
    data,
    rowIdx,
    startEdit,
    stopEdit,
    handleEditChange,
    saveUsers,
    removeUser,
    editIdx,
    groupMembers,
    focus,
    focusMe,
    allData,
    lockedColumns,
    deleteRow
  ) => {
    const isEditing = editIdx.includes(rowIdx)
    if (data.delete) {
      console.log('found deleted row')
    } else if (isEditing) {
      return (
        <InlineForm
          rowIdx={rowIdx}
          data={data}
          key={Math.random()}
          handleEditChange={handleEditChange}
          saveUsers={saveUsers}
          removeUser={removeUser}
          stopEdit={stopEdit}
          groupMembers={groupMembers}
          focus={focus}
          focusMe={focusMe}
          allData={allData}
          lockedColumns={lockedColumns}
          deleteRow={deleteRow}
        />
      )
    } else {
      return (
        <Table.Row key={Math.random()}>
          <Table.Cell className="custom-edit">
            <Button
              icon
              onClick={() => startEdit(rowIdx, data)}
              inverted={true}
            >
              <Icon name="edit" inverted={true} />
            </Button>
          </Table.Cell>
          {!!this.state.editIdx.length && <Table.Cell />}
          <Table.Cell className="custom-item">{data.item}</Table.Cell>
          <Table.Cell className="custom-cost">{data.cost}</Table.Cell>
          <Table.Cell className="custom-user">
            {data.users.map(user => (
              <Button disabled={true} key={user.email}>
                {user.name}
              </Button>
            ))}
          </Table.Cell>
          {!!this.state.editIdx.length && <Table.Cell />}
        </Table.Row>
      )
    }
  }

  render() {
    return (
      <div>
        <Segment style={{overflow: 'scroll', maxHeight: '66vh'}}>
          {this.state.editIdx.length ? (
            ''
          ) : (
            <Popup
              trigger={<div />}
              content="Here is your receipt! Please verify and make changes."
              on="click"
              style={popStyle}
              open={this.state.isOpen}
              onClick={this.handleOpen}
              position="top center"
            />
          )}
          {this.props.selectedGroup && (
            <UserBalances
              isUploader={this.isUploader()}
              uploader={this.props.singleReceipt.uploader}
              userAmounts={this.state.userAmounts}
              submitEmail={this.submitEmail}
              emailSent={this.state.emailConfirmation}
              data={this.state.data}
              submitUserAmountsEmail={this.submitUserAmountsEmail}
            />
          )}
          <Table selectable inverted celled>
            {/* header row */}
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell className="custom-edit">
                  Edit
                </Table.HeaderCell>
                {!!this.state.editIdx.length && (
                  <Table.HeaderCell className="custom-delete">
                    Delete
                    {!!this.state.editIdx.length &&
                      this.isUploader() && (
                        <Icon
                          link
                          style={{marginLeft: '15px'}}
                          name={this.state.lock.delete ? 'lock' : 'unlock'}
                          onClick={() => this.lockColumn('delete')}
                        />
                      )}
                  </Table.HeaderCell>
                )}
                <Table.HeaderCell>
                  Item
                  {!!this.state.editIdx.length &&
                    this.isUploader() && (
                      <Icon
                        link
                        style={{marginLeft: '15px'}}
                        name={this.state.lock.item ? 'lock' : 'unlock'}
                        onClick={() => this.lockColumn('item')}
                      />
                    )}
                </Table.HeaderCell>
                <Table.HeaderCell className="custom-cost">
                  Cost
                  {!!this.state.editIdx.length &&
                    this.isUploader() && (
                      <Icon
                        link
                        style={{marginLeft: '15px'}}
                        name={this.state.lock.cost ? 'lock' : 'unlock'}
                        onClick={() => this.lockColumn('cost')}
                      />
                    )}
                </Table.HeaderCell>
                <Table.HeaderCell className="custom-user">
                  User(s)
                  {!!this.state.editIdx.length &&
                    this.isUploader() && (
                      <Icon
                        link
                        style={{marginLeft: '15px'}}
                        name={this.state.lock.user ? 'lock' : 'unlock'}
                        onClick={() => this.lockColumn('user')}
                      />
                    )}
                </Table.HeaderCell>
                {!!this.state.editIdx.length && (
                  <Table.HeaderCell className="custom-add-user">
                    Add User
                    {!!this.state.editIdx.length &&
                      this.isUploader() && (
                        <Icon
                          link
                          style={{marginLeft: '15px'}}
                          name={this.state.lock.addUser ? 'lock' : 'unlock'}
                          onClick={() => this.lockColumn('addUser')}
                        />
                      )}
                  </Table.HeaderCell>
                )}
              </Table.Row>
            </Table.Header>
            {/* header row */}
            <Table.Body>
              {this.state.data.map((data, rowIdx) => {
                return this.row(
                  data,
                  rowIdx,
                  this.startEdit,
                  this.stopEdit,
                  this.handleEditChange,
                  this.saveUsers,
                  this.removeUser,
                  this.state.editIdx,
                  this.props.selectedGroup.users,
                  this.state.focus,
                  this.focusMe,
                  this.state.data,
                  this.state.lock,
                  this.deleteRow
                )
              })}
            </Table.Body>
          </Table>
        </Segment>
      </div>
    )
  }
}

const mapState = state => ({
  singleReceipt: state.receipts.singleReceipt,
  selectedGroup: state.groups.selectedGroup,
  user: state.user
})

export default connect(mapState, {
  getSingleReceiptFromServer,
  selectGroupThunk,
  updateReceiptThunk
})(SocketTable)
