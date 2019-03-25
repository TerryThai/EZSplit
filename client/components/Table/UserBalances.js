import React, {Component} from 'react'
import {
  Button,
  Table,
  Dropdown,
  Segment,
  Icon,
  Form,
  Input
} from 'semantic-ui-react'

const UserBalances = ({calc, owner}) => {
  return (
    <Table selectable inverted celled>
      <Table.Header>
        <Table.Row>
          {calc.map(row => {
            return (
              <Table.HeaderCell>
                {row.email === owner.email
                  ? `${row.name} Paid: $${row.amount}`
                  : `${row.name}: $${row.amount}`}
              </Table.HeaderCell>
            )
          })}
        </Table.Row>
      </Table.Header>
    </Table>
  )
}

export default UserBalances
