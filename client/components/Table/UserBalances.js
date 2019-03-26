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

///////////////////////////////
//TODO
//persistent data amounts per user
//pass owner down as props

const owner = {
  name: 'yuva chang',
  email: 'yuva.chang@gmail.com'
}

class UserBalances extends Component {
  // state = {
  //   users: []
  // }

  // calcBalances = async () => {
  //   if (this.state.users.length !== this.props.users.length) {
  //     const newsetstate = [...this.props.users]
  //     await this.setState({
  //       users: newsetstate
  //     })
  //   }
  //   const userItems = this.props.userItems
  //   let newUsers = []
  //   for (let userEmail in userItems) {
  //     const currentUser = this.state.users.filter(
  //       user => user.email === userEmail
  //     )[0]
  //     if (Object.keys(userItems[userEmail]).length) {
  //       let sum = this.sumValues(userItems[userEmail])
  //       currentUser.amount = sum.toFixed(2)
  //     } else {
  //       currentUser.amount = 0
  //     }
  //     newUsers.push(currentUser)
  //   }
  //   await this.setState({
  //     users: newUsers
  //   })

  // dispatch update to parent component
  // }

  // componentDidUpdate = async prevProps => {
  //   if (this.props !== prevProps) {
  //     await this.calcBalances()
  //   }
  // }

  // componentDidMount = async () => {
  //   await this.calcBalances()
  // }

  render() {
    console.log('USERBALANCES', this.props)
    return (
      <Table inverted celled>
        <Table.Header>
          <Table.Row>
            {Object.keys(this.props.userAmounts).map(key => {
              const user = this.props.userAmounts[key]
              return (
                <Table.HeaderCell key={key}>
                  {this.props.uploader.email === key
                    ? `(Original Payer) ${user.name}: $${user.amount}`
                    : `${user.name}: $${user.amount}`}
                </Table.HeaderCell>
              )
            })}
            <Table.HeaderCell>
              {/* <Button inverted size="tiny">
                Save?
              </Button> */}
              <Button onClick={this.props.submitEmail}>
                {!this.props.emailSent
                  ? 'Email Invitations'
                  : this.props.emailSent}
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
    )
  }
}

export default UserBalances
