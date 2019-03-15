import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getOcrThunk} from '../store/receipts'
import {helpers} from '../../helpers'
import BootstrapTable from 'react-bootstrap-table-next'
import cellEditFactory from 'react-bootstrap-table2-editor'

class UploadImage extends Component {
  handleChange = async evt => {
    let file = evt.target.files[0]
    await this.props.getOcrThunk(file)
  }

  render() {
    //deconstruct helper functions
    const {removeDollarSign, capitalize} = helpers

    // mapping over line items and using tenary to see if it exists
    const lineItems = this.props.ocr.amounts
      ? this.props.ocr.amounts.map((item, idx) => {
          // properly formatted each line item
          const formmatted = capitalize(item.text)
          // removed dollar sign
          const noDollah = removeDollarSign(formmatted)
          return {Food: noDollah, id: idx, Cost: item.data}
        })
      : []

    const products = this.props.ocr.amounts ? this.props.ocr.amounts : []
    const columns = [
      {
        dataField: 'Food',
        text: 'Food'
      },
      {
        dataField: 'Cost',
        text: 'Cost'
      }
    ]

    const total = this.props.ocr.totalAmount ? (
      <div>total amount: {this.props.ocr.totalAmount.data}</div>
    ) : (
      ''
    )

    return (
      <div>
        {total}
        <BootstrapTable
          keyField="id"
          data={lineItems}
          columns={columns}
          cellEdit={cellEditFactory({mode: 'click'})}
        />
        <form>
          <input type="file" onChange={this.handleChange} />
        </form>
      </div>
    )
  }
}

const mapState = state => ({
  ocr: state.receipts.ocr
})

const mapDispatch = dispatch => ({
  getOcrThunk: file => dispatch(getOcrThunk(file))
})

export default connect(mapState, mapDispatch)(UploadImage)
