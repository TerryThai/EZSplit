import React, {Component} from 'react'
import socket from '../../socket'

import {
  Button,
  Table,
  Dropdown,
  Segment,
  Icon,
  Form,
  Input,
  TextArea
} from 'semantic-ui-react'

let addusers = []

class InlineForm extends Component {
  saveUsers = () => {
    this.props.saveUsers(addusers, this.props.rowIdx)
    addusers = []
  }

  handleUsers = (evt, data) => {
    addusers = data.value
  }

  focus = (num, rowIdx) =>
    num === this.props.focus[0] && rowIdx === this.props.focus[1]

  // allow save/stopEdit on Enter keydown
  handleKeyDown = e => {
    if (e.keyCode === 13) {
      this.props.stopEdit(this.props.rowIdx)
      socket.emit('cell-update', this.props.allData)
    }
  }

  render() {
    // group members dropdown list functions:

    const added = this.props.data.users.map(user => user.email)
    const leftover = this.props.groupMembers.filter(
      member => !added.includes(member.email)
    )
    const groupMembersList = leftover.map(member => ({
      key: Math.random(),
      text: member.name,
      value: member.email
    }))

    ///////////////////

    return (
      <Table.Row key={Math.random()}>
        <Table.Cell className="custom-edit">
          <Button
            icon
            inverted={true}
            onClick={() => {
              this.props.stopEdit(this.props.rowIdx)
              console.log('all data', this.props.allData)
              socket.emit('cell-update', this.props.allData)
            }}
          >
            <Icon name="save" />
          </Button>
        </Table.Cell>
        <Table.Cell className="custom-delete">
          <Button
            icon
            onClick={() => this.props.deleteRow(this.props.rowIdx)}
            inverted={true}
            disabled={this.props.lockedColumns.delete}
          >
            <Icon name="delete" inverted={true} />
          </Button>
        </Table.Cell>
        <Table.Cell>
          <Input
            fluid
            disabled={this.props.lockedColumns.item}
            autoFocus={this.focus(1, this.props.rowIdx)}
            onKeyDown={evt => this.handleKeyDown(evt, this.props.rowIdx)}
            onChange={evt => {
              this.props.handleEditChange(evt, this.props.rowIdx)
              this.props.focusMe(1, this.props.rowIdx)
            }}
            value={this.props.data.item}
            name="item"
          />
        </Table.Cell>
        <Table.Cell className="custom-cost">
          <Input
            style={{width: '100px'}}
            type="number"
            disabled={this.props.lockedColumns.cost}
            autoFocus={this.focus(2, this.props.rowIdx)}
            onKeyDown={evt => this.handleKeyDown(evt, this.props.rowIdx)}
            onChange={evt => {
              this.props.handleEditChange(evt, this.props.rowIdx)
              this.props.focusMe(2, this.props.rowIdx)
            }}
            value={this.props.data.cost}
            name="cost"
          />
        </Table.Cell>
        <Table.Cell className="custom-user">
          {this.props.data.users.map(user => {
            return (
              <Button
                disabled={this.props.lockedColumns.user}
                size="tiny"
                key={user.email}
                onClick={() =>
                  this.props.removeUser(user.email, this.props.rowIdx)
                }
              >
                {user.name} X
              </Button>
            )
          })}
        </Table.Cell>
        <Table.Cell>
          <Dropdown
            fluid
            disabled={this.props.lockedColumns.addUser}
            placeholder="People"
            multiple
            selection
            options={groupMembersList}
            onBlur={this.saveUsers}
            onChange={this.handleUsers}
          />
        </Table.Cell>
      </Table.Row>
    )
  }
}

export default InlineForm
