import React, {Component} from 'react'
import {Icon, Statistic} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {getReceiptsByUserFromServer} from '../../store/receipts'

class Stats extends Component {
  async componentDidMount() {
    await this.props.getUserReceipts(this.props.email)
  }
  render() {
    //double reduce cuz its so nested
    let total = this.props.userReceipts.receipts
      ? this.props.userReceipts.receipts.reduce((sum, receipt) => {
          return (
            sum +
            receipt.data.reduce((all, item) => {
              return all + item.cost
            }, 0)
          )
        }, 0)
      : 0
    return (
      <Statistic size="tiny" color="red" horizontal inverted>
        <Statistic.Value>
          <Icon name="dollar sign" />
          {total}
        </Statistic.Value>
        <Statistic.Label>Spent</Statistic.Label>
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
