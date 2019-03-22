import React, {Component} from 'react'
import {connect} from 'react-redux'
import BootstrapTable from 'react-bootstrap-table-next'
import cellEditFactory from 'react-bootstrap-table2-editor'
import {getSingleReceiptFromServer, updateReceipt} from '../../store/receipts'
import socket from '../../socket'

let lineItems

class EditReceipt extends Component {
  state = {
    name: ''
  }

  componentDidMount() {
    this.props.getSingleReceiptFromServer(this.props.match.params.receiptId)
  }

  hi = event => {
    if (event.keyCode === 13) {
      // console.log(event.target.value)
      socket.emit('cell-update', lineItems)
    }
  }

  render() {
    lineItems = this.props.singleReceipt.data
      ? this.props.singleReceipt.data.map((item, idx) => {
          return {Items: item.Items, id: idx, Cost: item.Cost}
        })
      : {}

    const columns = [
      {dataField: 'Items', text: 'Items'},
      {dataField: 'Cost', text: 'Cost'},
      {dataField: 'id', text: 'Idx'}
    ]

    const table = this.props.singleReceipt.data && (
      <div className="thetable" onKeyDown={this.hi}>
        <BootstrapTable
          name={name}
          keyField="id"
          data={lineItems}
          columns={columns}
          cellEdit={cellEditFactory({mode: 'click'})}
          name="Item"
        />
      </div>
    )

    return <div className="table-div-container">{table}</div>
  }
}

const mapState = state => ({
  singleReceipt: state.receipts.singleReceipt
})

// const mapDispatch = dispatch => ({
//   getSingleReceiptFromServer: () => dispatch(getSingleReceiptFromServer()),
//   updateReceipt: newData => dispatch(updateReceipt(newData))
// })

export default connect(mapState, {getSingleReceiptFromServer, updateReceipt})(
  EditReceipt
)
