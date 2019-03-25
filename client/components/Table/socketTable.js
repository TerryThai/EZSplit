import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  getSingleReceiptFromServer,
  updateReceipt,
  selectGroupThunk
} from '../../store'
import store from '../../store/index'
import socket from '../../socket'
import {InlineForm, UserBalances} from '../index'
import axios from 'axios'
import {
  Button,
  Table,
  Dropdown,
  Segment,
  Icon,
  Form,
  Input
} from 'semantic-ui-react'

class SocketTable extends Component {
  state = {
    data: [],
    calc: [],
    total: 0,
    editIdx: [],
    groupMembers: [],
    focus: [],
    lock: {
      item: false,
      cost: false,
      user: false,
      addUser: false
    },
    emailConfirmation: ''
  }

  async componentDidMount() {
    await this.props.getSingleReceiptFromServer(
      this.props.match.params.receiptId
    )
    await this.props.selectGroupThunk(this.props.singleReceipt.groupId)
    let lineItems = []
    this.props.singleReceipt.data.forEach((item, idx) => {
      if (
        !item.items.toLowerCase().includes('total') &&
        !item.items.toLowerCase().includes('cash')
      ) {
        lineItems.push({item: item.items, id: idx, cost: item.cost, users: []})
      }
    })

    // const calcArray = this.props.groupMembers.map(member=>({email: member.email, payee: this.props.singleReceipt.uploader.email, amount: 0}))

    // invoke this.calcBalance on saveUser and removeUser ?  to update the this.state.calc

    // this.state.calc is [{email, payee, amount}]
    // or [{name, email, amount}], receipt payer = uploader => will initiate with uploader?

    await this.setState({
      data: lineItems,
      groupMembers: this.props.selectedGroup.users
      // calc: calcArray
    })
    socket.on('cell-update', newData => {
      console.log(newData)
      store.dispatch(updateReceipt({data: newData}))
      this.setState({data: newData})
    })
  }

  startEdit = (rowIdx, data) => {
    console.log('start edit')
    this.setState({
      editIdx: [...this.state.editIdx, rowIdx]
    })
  }

  saveUsers = (userEmails, rowIdx) => {
    const row = this.state.data[rowIdx]
    const rowUserEmails = row.users.map(user => user.email)
    const userEmailsDeduped = userEmails.filter(
      email => !rowUserEmails.includes(email)
    )
    if (!userEmailsDeduped[0]) return
    const newUsers = this.state.groupMembers.filter(user =>
      userEmailsDeduped.includes(user.email)
    )
    const newRow = {...row, users: [...row.users, ...newUsers]}
    const newState = this.state.data
    newState[rowIdx] = newRow
    this.setState({
      data: newState
    })
  }

  removeUser = (userEmail, rowIdx) => {
    const row = this.state.data[rowIdx]
    const newUsers = row.users.filter(user => user.email !== userEmail)
    const newRow = {...row, users: newUsers}
    const newState = this.state.data
    newState[rowIdx] = newRow
    this.setState({
      data: newState
    })
  }

  handleEditChange = (evt, rowIdx) => {
    const row = this.state.data[rowIdx]
    const newRow = {...row, [evt.target.name]: evt.target.value}
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
    const newEditIdx = this.state.editIdx.filter(idx => idx !== rowIdx)
    await this.setState({
      editIdx: newEditIdx
    })
  }

  lockColumn = async column => {
    this.setState({
      lock: {
        ...this.state.lock,
        [column]: !this.state.lock[column]
      }
    })
  }

  calcBalances = () => {}

  submitEmail = async () => {
    this.setState({emailConfirmation: '..Sending Email!'})
    const obj = {
      receiptId: this.props.singleReceipt._id,
      uploader: this.props.singleReceipt.uploader.name,
      recipients: this.props.selectedGroup.users
    }
    console.log('obj', obj)
    await axios.post('/api/email/send', obj)
    this.setState({emailConfirmation: ''})
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
    lockedColumns
  ) => {
    const isEditing = editIdx.includes(rowIdx)
    if (isEditing) {
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
        />
      )
    } else {
      return (
        <Table.Row key={Math.random()}>
          <Table.Cell className="custom-edit">
            <Button icon onClick={() => startEdit(rowIdx, data)}>
              <Icon name="edit" />
            </Button>
          </Table.Cell>
          <Table.Cell className="custom-item">{data.item}</Table.Cell>
          <Table.Cell className="custom-cost">{data.cost}</Table.Cell>
          <Table.Cell className="custom-user">
            {data.users.map(user => user.name)}
          </Table.Cell>
          {!!this.state.editIdx.length && <Table.Cell />}
        </Table.Row>
      )
    }
  }

  render() {
    console.log('socketTable state render', this.state)
    return (
      <div>
        <Segment style={{overflow: 'scroll', maxHeight: '66vh'}}>
          {/* <UserBalances calc={this.state.calc uploader={this.props.singleReceipt.uploader} /> */}
          <Table selectable inverted celled>
            {/* header row */}
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Edit</Table.HeaderCell>
                <Table.HeaderCell>
                  Item
                  {!!this.state.editIdx.length && (
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
                  {!!this.state.editIdx.length && (
                    <Icon
                      link
                      style={{marginLeft: '15px'}}
                      name={this.state.lock.cost ? 'lock' : 'unlock'}
                      onClick={() => this.lockColumn('cost')}
                    />
                  )}
                </Table.HeaderCell>
                <Table.HeaderCell>
                  User(s)
                  {!!this.state.editIdx.length && (
                    <Icon
                      link
                      style={{marginLeft: '15px'}}
                      name={this.state.lock.user ? 'lock' : 'unlock'}
                      onClick={() => this.lockColumn('user')}
                    />
                  )}
                </Table.HeaderCell>
                {!!this.state.editIdx.length && (
                  // (this.props.user.email ===
                  //   this.props.singleReceipt.uploader.email) &&
                  <Table.HeaderCell>
                    Add User
                    {!!this.state.editIdx.length && (
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
                  this.state.groupMembers,
                  this.state.focus,
                  this.focusMe,
                  this.state.data,
                  this.state.lock
                )
              })}
            </Table.Body>
          </Table>
        </Segment>
        <Button onClick={this.submitEmail}>
          Email Group Members to join Board
        </Button>
        <h3>{this.state.emailConfirmation}</h3>
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
  updateReceipt,
  selectGroupThunk
})(SocketTable)
