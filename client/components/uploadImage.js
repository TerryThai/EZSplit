import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getOcrThunk} from '../store/receipts'
import {helpers} from '../../helpers'

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
          return <div key={idx}>{noDollah}</div>
        })
      : []

    const total = this.props.ocr.totalAmount ? (
      <div>total amount: {this.props.ocr.totalAmount.data}</div>
    ) : (
      ''
    )

    return (
      <div>
        {total}
        {lineItems}
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
