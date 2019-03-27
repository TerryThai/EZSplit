import React, {Component} from 'react'
import {Feed} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {FeedContent} from '../index'

class FeedInfo extends Component {
  getIOUs = () => {
    let youOwe = {}
    let oweYou = {}

    this.props.userReceipts.forEach(receipt => {
      if (this.props.email === receipt.uploader.email) {
        const friendsEmails = Object.keys(receipt.userAmounts).filter(
          email => email !== receipt.uploader.email
        )
        friendsEmails.forEach(email => {
          const friendName = receipt.userAmounts[email].name
          const friendTotal = Number(receipt.userAmounts[email].amount)
          if (!oweYou[email]) {
            oweYou[email] = {name: friendName, amount: friendTotal}
          } else {
            oweYou[email].amount += friendTotal
          }
        })
      } else {
        const yourDebt = Number(receipt.userAmounts[this.props.email].amount)
        const yourPayee = {
          name: receipt.uploader.name,
          email: receipt.uploader.email
        }
        if (!youOwe[yourPayee.email]) {
          youOwe[yourPayee.email] = yourDebt
        } else {
          youOwe[yourPayee.email] += yourDebt
        }
      }
    })

    oweYou = Object.keys(oweYou).map(payer => ({
      name: oweYou[payer].name,
      email: payer,
      amount: oweYou[payer].amount
    }))
    youOwe = Object.keys(youOwe).map(payee => ({
      name: youOwe[payee].name,
      email: payee,
      amount: youOwe[payee].amount
    }))

    return {oweYou, youOwe}
  }

  render() {
    console.log(this.getIOUs())
    return (
      <Feed>
        <FeedContent ious={this.getIOUs()} />
      </Feed>
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

export default connect(mapState, mapDispatch)(FeedInfo)
