import React, {Component} from 'react'
import {connect} from 'react-redux'
import BootstrapTable from 'react-bootstrap-table-next'
import cellEditFactory from 'react-bootstrap-table2-editor'
import {getSingleReceiptFromServer} from '../../store/receipts'
import socket from '../../socket'

class EditReceipt extends Component {
  state = {
    name: ''
  }

  componentDidMount() {
    this.props.getSingleReceiptFromServer(this.props.match.params.receiptId)
  }

  hi = () => {
    console.log('hi')
    socket.emit('cell-update', 'hi')
  }

  render() {
    const lineItems = this.props.singleReceipt.data
      ? this.props.singleReceipt.data.map((item, idx) => {
          return {Items: item.Items, id: idx, Cost: item.Cost}
        })
      : {}

    const columns = [
      {dataField: 'Items', text: 'Items'},
      {dataField: 'Cost', text: 'Cost'}
    ]

    const table = this.props.singleReceipt.data && (
      <div className="thetable" onChange={this.hi}>
        <BootstrapTable
          name={name}
          keyField="id"
          data={lineItems}
          columns={columns}
          cellEdit={cellEditFactory({mode: 'click'})}
        />
      </div>
    )

    return <div className="table-div-container">{table}</div>
  }
}

const mapState = state => ({
  singleReceipt: state.receipts.singleReceipt
})

export default connect(mapState, {getSingleReceiptFromServer})(EditReceipt)
