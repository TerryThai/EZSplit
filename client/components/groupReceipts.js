import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getReceiptsByGroupFromServer} from '../store'
import {Spinner, Table} from '../index'
import SingleReceipt from './singleReceipt'

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
    console.log('==============>', this.props.groupReceipts)

    return (
      <div className="all-receipts-container">
        {groupId &&
          receipts.map(receipt => (
            <SingleReceipt key={receipt._id} lineItems={receipt.data} />
            // return <div key={receipt._id}>{receipt.Cost}</div>
          ))}
        {/* {this.props.groupReceipts.groupId ? this.props.groupReceipts.receipts.map(
            item => item.img.name
          ) : ''} */}
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
