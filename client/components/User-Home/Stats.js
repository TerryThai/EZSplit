import React, {Component} from 'react'
import {Icon, Statistic} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {getReceiptsByUserFromServer} from '../../store/receipts'

class Stats extends Component {
  async componentDidMount() {
    await this.props.getUserReceipts(this.props.email)
  }

  getTotalSpendings = () => {
    let userTotalSpending = 0
    if (this.props.userReceipts.length) {
      console.log('totalspendings length found')
      this.props.userReceipts.forEach(receipt => {
        userTotalSpending += Number(
          receipt.userAmounts[this.props.email].amount
        )
      })
      return userTotalSpending.toFixed(2)
    } else {
      console.log('totalspendings no length found')
      return userTotalSpending
    }
  }

  render() {
    return (
      <Statistic
        size="mini"
        color="red"
        className="spent-container"
        horizontal
        inverted
        floated="left"
      >
        <Statistic.Value>${this.getTotalSpendings()}</Statistic.Value>
        <Statistic.Label>Spent Total</Statistic.Label>
      </Statistic>
    )
  }
}

const mapState = state => ({
  userReceipts: state.receipts.userReceipts,
  email: state.user.email
})

const mapDispatch = dispatch => ({
  getUserReceipts: email => dispatch(getReceiptsByUserFromServer(email))
})

export default connect(mapState, mapDispatch)(Stats)
