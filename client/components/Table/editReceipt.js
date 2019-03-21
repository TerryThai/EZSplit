import React, {Component} from 'react'
import {helpers} from '../../../helpers'
import {connect} from 'react-redux'
import BootstrapTable from 'react-bootstrap-table-next'
import cellEditFactory from 'react-bootstrap-table2-editor'
import Tip from '../Tip/tip'
import {Button} from 'semantic-ui-react'
import {getSingleReceiptFromServer} from '../../store/receipts'

class EditReceipt extends Component {
  state = {}

  componentDidMount() {
    this.props.getSingleReceiptFromServer(this.props.match.params.receiptId)
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
      <div className="thetable">
        <BootstrapTable
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
