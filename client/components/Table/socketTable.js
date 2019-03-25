import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  getSingleReceiptFromServer,
  updateReceipt,
  selectGroupThunk
} from '../../store'
import store from '../../store/index'
import socket from '../../socket'
import axios from 'axios'
import {InlineForm} from '../index'
import {
  Button,
  Table,
  Dropdown,
  Segment,
  Icon,
  Form,
  Input
} from 'semantic-ui-react'

const row = (
  data,
  rowIdx,
  startEdit,
  stopEdit,
  handleEditChange,
  saveUsers,
  editIdx,
  groupMembers,
  focus,
  focusMe,
  allData
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
        stopEdit={stopEdit}
        groupMembers={groupMembers}
        focus={focus}
        focusMe={focusMe}
        allData={allData}
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
      </Table.Row>
    )
  }
}

class SocketTable extends Component {
  state = {
    data: [],
    calc: [],
    editIdx: [],
    groupMembers: [],
    focus: [],
    emailConfirmation: ''
  }

  async componentDidMount() {
    await this.props.getSingleReceiptFromServer(
      this.props.match.params.receiptId
    )
    await this.props.selectGroupThunk(this.props.singleReceipt.groupId)
    const lineItems = this.props.singleReceipt.data.map((item, idx) => {
      return {item: item.Items, id: idx, cost: item.Cost, users: []}
    })

    this.setState({
      data: lineItems,
      groupMembers: this.props.selectedGroup.users
    })
    console.log(this.state)
    socket.on('cell-update', newData => {
      console.log(newData)
      store.dispatch(updateReceipt({data: newData}))
      this.setState({data: newData})
    })
  }

  hi = event => {
    console.log('changing')
    if (event.keyCode === 13) {
      socket.emit('cell-update', lineItems)
    }
  }

  startEdit = (rowIdx, data) => {
    console.log('start edit')
    this.setState({
      editIdx: [...this.state.editIdx, rowIdx]
    })
  }

  saveUsers = (userEmails, rowIdx) => {
    let addUsers = this.state.groupMembers.filter(user =>
      userEmails.includes(user.email)
    )
    const row = this.state.data[rowIdx]
    const newRow = {...row, users: addUsers}
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

  submitEmail = async () => {
    this.setState({emailConfirmation: '..Sending Email!'})
    const obj = {
      receiptId: this.props.singleReceipt._id,
      uploader: this.props.singleReceipt.uploader.name,
      recipients: this.props.selectedGroup.users
    }
    await axios.post('/api/email/send', obj)
    this.setState({emailConfirmation: ''})
  }

  render() {
    return (
      <div>
        <Segment style={{overflow: 'scroll', maxHeight: '66vh'}}>
          <Table selectable inverted celled>
            {/* header row */}
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Edit</Table.HeaderCell>
                <Table.HeaderCell>item</Table.HeaderCell>
                <Table.HeaderCell>cost</Table.HeaderCell>
                <Table.HeaderCell>User</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            {/* header row */}
            <Table.Body>
              {this.state.data.map((data, rowIdx) => {
                return row(
                  data,
                  rowIdx,
                  this.startEdit,
                  this.stopEdit,
                  this.handleEditChange,
                  this.saveUsers,
                  this.state.editIdx,
                  this.state.groupMembers,
                  this.state.focus,
                  this.focusMe,
                  this.state.data
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
  selectedGroup: state.groups.selectedGroup
})

// const mapDispatch = dispatch => ({
//   getSingleReceiptFromServer: () => dispatch(getSingleReceiptFromServer()),
//   updateReceipt: newData => dispatch(updateReceipt(newData))
// })

export default connect(mapState, {
  getSingleReceiptFromServer,
  updateReceipt,
  selectGroupThunk
})(SocketTable)
