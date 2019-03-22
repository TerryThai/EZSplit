import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getReceiptsByGroupFromServer} from '../store'
import {Spinner, Table} from '../index'
import SingleReceipt from './singleReceipt'
import {Link} from 'react-router-dom'

class groupReceipts extends Component {
  state = {
    isLoading: false
  }

  componentDidMount() {
    // this.setState({isLoading: true})
    const id = this.props.match.params.groupId
    this.props.loadGroupReceipts(id)
  }

  render() {
    const {groupId, receipts} = this.props.groupReceipts

    return (
      <div className="all-receipts-container">
        {groupId &&
          receipts.map(receipt => {
            return (
              <Link key={receipt._id} to={`/editReceipt/${receipt._id}`}>
                <SingleReceipt key={receipt._id} lineItems={receipt.data} />
              </Link>
            )
          })}
      </div>
    )
  }
}

const mapState = state => ({
  groupReceipts: state.receipts.groupReceipts
})

const mapDispatch = dispatch => ({
  loadGroupReceipts: id => dispatch(getReceiptsByGroupFromServer(id))
})

export default connect(mapState, mapDispatch)(groupReceipts)
