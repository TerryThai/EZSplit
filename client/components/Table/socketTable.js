import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  getSingleReceiptFromServer,
  updateReceipt,
  selectGroupThunk
} from '../../store'
import store from '../../store/index'
import socket from '../../socket'

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
  // handleSave,
  editIdx,
  users,
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
        users={users}
        focus={focus}
        focusMe={focusMe}
        allData={allData}
      />
    )
  } else {
    return (
      <Table.Row key={Math.random()}>
        <Table.Cell style={{width: '5em'}}>
          <Button icon onClick={() => startEdit(rowIdx, data)}>
            <Icon name="edit" />
          </Button>
        </Table.Cell>
        <Table.Cell>{data.item}</Table.Cell>
        <Table.Cell style={{width: '10em'}}>{data.cost}</Table.Cell>
        <Table.Cell style={{width: '15em'}}>
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
    focus: []
  }

  async componentDidMount() {
    await this.props.getSingleReceiptFromServer(
      this.props.match.params.receiptId
    )
    await this.props.selectGroupThunk(this.props.singleReceipt.groupId)

    const lineItems = this.props.singleReceipt.data.map((item, idx) => {
      return {item: item.Items, id: idx, cost: item.Cost, users: []}
    })
    this.setState({data: lineItems})
    console.log(this.state)
    socket.on('cell-update', newData => {
      console.log(newData, 'in sockets file')

      /****************************/
      /*******DO THUNK HERE****/
      /****************************/
      store.dispatch(updateReceipt(newData))
      this.setState({data: newData})
    })
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps !== this.props) {
  //     console.log('==>prevProps', prevProps, '==>this.props', this.props)
  //     // this.setState({data: this.props.singleReceipt.data})
  //   }
  // }

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
      // editData: [...editData, data]
    })
  }

  saveUsers = (userEmails, rowIdx) => {
    let addUsers = users.filter(user => userEmails.includes(user.email))
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
    console.log('stop edit', this.state.editIdx, rowIdx)
    const newEditIdx = this.state.editIdx.filter(idx => idx !== rowIdx)
    await this.setState({
      editIdx: newEditIdx
    })
    console.log(this.state.editIdx)
  }

  render() {
    console.log('selectedgroup', this.props.selectedGroup)
    return (
      <div style={{width: '200%'}}>
        <Segment style={{overflow: 'auto', maxHeight: '66vh', width: '100vh'}}>
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
                  // this.handleSave,
                  this.state.editIdx,
                  // this.props.users
                  this.props.users,
                  this.state.focus,
                  this.focusMe,
                  this.state.data
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
  // users: state.groups.selectedGroup.users,
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
