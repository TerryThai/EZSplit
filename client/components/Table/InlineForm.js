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
  }

  handleUsers = (evt, data) => {
    addusers = data.value
  }

  focus = (num, rowIdx) =>
    num === this.props.focus[0] && rowIdx === this.props.focus[1]

  handleKeyDown = e => {
    if (e.keyCode === 13) {
      console.log('==========>', e.target, e.keyCode)
      this.props.stopEdit(this.props.rowIdx)
      console.log('this is newData ===>', this.props.allData)
      socket.emit('cell-update', this.props.allData)
    }
  }

  render() {
    const groupMembersList = this.props.groupMembers.map(member => {
      return {key: Math.random(), text: member.name, value: member.email}
    })

    return (
      <Table.Row key={Math.random()}>
        <Table.Cell>
          <Button
            icon
            onClick={() => {
              console.log(this.props.rowIdx)
              this.props.stopEdit(this.props.rowIdx)
              socket.emit('cell-update', this.props.allData)
            }}
          >
            <Icon name="save" />
          </Button>
        </Table.Cell>
        <Table.Cell>
          <Input
            fluid
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
        <Table.Cell>
          <Input
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
        <Table.Cell>
          <Dropdown
            fluid
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
