import React, {Component} from 'react'
import {helpers} from '../../../helpers'
import {connect} from 'react-redux'
import BootstrapTable from 'react-bootstrap-table-next'
import cellEditFactory from 'react-bootstrap-table2-editor'
import Tip from '../Tip/tip'
import {Button} from 'semantic-ui-react'
import {saveReceiptThunk} from '../../store/receipts'

class Table extends Component {
  state = {}

  render() {
    const {removeDollarSign, capitalize} = helpers
    // mapping over line items and using tenary to see if it exists,
    // if not the lineItem will return an empty object
    // the way the bootstrap table works is that it requires an
    // object to be fed in to the cells
    const lineItems = this.props.ocr.amounts
      ? this.props.ocr.amounts.map((item, idx) => {
          // properly formatted each line item so that
          // the first letter of each word is capitalized
          const formmatted = capitalize(item.text)
          // removed dollar sign as the api we utilized
          // combines the price and name of the item in a string
          const noDollah = removeDollarSign(formmatted)
          return {items: noDollah, id: idx, cost: item.data}
        })
      : {}

    const columns = [
      {dataField: 'items', text: 'Items'},
      {dataField: 'cost', text: 'Cost'}
    ]

    // this table variable is tenary that renders out
    // our tip buttons and receipt only if it exists in our redux store.
    // In other words, it will not render unless the user uploads a receipt.
    const table = this.props.ocr.amounts && (
      <div className="thetable">
        {/* Rendering the tip buttons on top of receipt table.
        Also passing in the ocr object from redux store as props.
        We could have used connect in the tip component as well */}
        <Tip originalOcr={this.props.originalOcr} />
        <BootstrapTable
          keyField="id"
          data={lineItems}
          columns={columns}
          cellEdit={cellEditFactory({mode: 'click'})}
        />
      </div>
    )

    const {totalAmount} = this.props.ocr
    const id = this.props.groupId ? this.props.groupId : 'nothing yet'
    const uploader = this.props.user.name ? this.props.user : 'nothing yet'
    return (
      <div className="table-div-container">
        {table}
        {this.props.ocr.totalAmount && (
          <div className="total-Save-contaniner">
            <div>
              total amount: {totalAmount.data}
              <Button
                color="black"
                floated="right"
                onClick={() => this.props.saveReceipt(id, lineItems, uploader)}
              >
                Save Receipt
              </Button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => ({
  ocr: state.receipts.ocr,
  originalOcr: state.receipts.originalOcr,
  user: state.user
})

const mapDispatch = dispatch => ({
  saveReceipt: (groupId, table, uploader) =>
    dispatch(saveReceiptThunk(groupId, table, uploader))
})

export default connect(mapState, mapDispatch)(Table)
