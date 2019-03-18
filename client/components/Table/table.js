import React, {Component} from 'react'
import {helpers} from '../../../helpers'
import {connect} from 'react-redux'
import BootstrapTable from 'react-bootstrap-table-next'
import cellEditFactory from 'react-bootstrap-table2-editor'
import Tip from '../Tip/tip'

class Table extends Component {
  state = {}

  render() {
    //deconstruct helper functions
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
          return {Items: noDollah, id: idx, Cost: item.data}
        })
      : {}

    const columns = [
      {dataField: 'Items', text: 'Items'},
      {dataField: 'Cost', text: 'Cost'}
    ]

    // this table variable is tenary that renders out
    // our tip buttons and receipt only if it exists in our redux store.
    // In other words, it will not render unless the user uploads a receipt.
    const table = this.props.ocr.amounts ? (
      <div>
        {/* Rendering the tip buttons on top of receipt table.
        Also passing in the ocr object from redux store as props.
        We could have used connect in the tip component as well */}
        <Tip ocr={this.props.ocr} />
        <BootstrapTable
          keyField="id"
          data={lineItems}
          columns={columns}
          cellEdit={cellEditFactory({mode: 'click'})}
        />
      </div>
    ) : (
      ''
    )
    // the total is also a ternary that either renders
    // out am amount or nothing at all
    const total = this.props.ocr.totalAmount ? (
      <div>total amount: {this.props.ocr.totalAmount.data}</div>
    ) : (
      ''
    )

    return (
      <div style={{width: '70%', margin: 'auto'}}>
        {table}
        {total}
      </div>
    )
  }
}

const mapState = state => ({
  ocr: state.receipts.ocr
})

export default connect(mapState)(Table)
