import React from 'react'
import {Button, Table} from 'semantic-ui-react'

const calcTotal = data => {
  const costs = data.map(row => (row.delete ? 0 : row.cost))
  console.log(costs)
  if (costs.length) {
    return costs.reduce((a, b) => Number(a) + Number(b)).toFixed(2)
  }
}

const UserBalances = props => {
  return (
    <Table
      id="table"
      inverted
      celled
      columns={Object.keys(props.userAmounts).length + 1}
    >
      <Table.Header id="table-header">
        <Table.Row id="table-row">
          <Table.HeaderCell id="payer-total-email">
            {Object.keys(props.userAmounts).map(key => {
              const user = props.userAmounts[key]
              return (
                <Button inverted>
                  {props.uploader.email === key
                    ? `(Original Payer) ${user.name}: $${user.amount}`
                    : `${user.name}: $${user.amount}`}
                </Button>
              )
            })}
            <Button inverted>Total: ${calcTotal(props.data)}</Button>
            {props.isUploader && (
              <Button onClick={props.submitEmail} disabled={!!props.emailSent}>
                {!props.emailSent ? 'Email Invitations' : props.emailSent}
              </Button>
            )}
          </Table.HeaderCell>
          <Table.HeaderCell>
            {props.isUploader && (
              <Button onClick={props.submitUserAmountsEmail}>
                Email User Balances
              </Button>
            )}
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    </Table>
  )
}

export default UserBalances
