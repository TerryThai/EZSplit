import React, {Component} from 'react'
import {connect} from 'react-redux'

const users = [
  {
    name: 'whatever',
    email: 'whatever@email.com'
  },
  {
    name: 'bob',
    email: 'bob@email.com'
  },
  {
    name: 'yuva',
    email: 'yuva@email.com'
  },
  {
    name: 'henry',
    email: 'henry@email.com'
  },
  {
    name: 'terry',
    email: 'terry@email.com'
  }
]

class SocketTable extends Component {
  state = {
    receiptsInfo: [
      {Item: 'Zuchinni Green', id: 0, Cost: 4.66},
      {Item: 'Banana Cavendish', id: 1, Cost: 1.32},
      {Items: 'Special', id: 2, Cost: 0.99},
      {Item: 'Special', id: 3, Cost: 1.5},
      {Item: 'Potatoes Brushed', id: 4, Cost: 3.97},
      {Item: 'Broccoli', id: 5, Cost: 4.84},
      {Item: 'Brussel Sprouts', id: 6, Cost: 5.15},
      {Item: 'Special', id: 7, Cost: 0.99},
      {Item: 'Grapes Green', id: 8, Cost: 7.03},
      {Item: 'Peas Snow', id: 9, Cost: 3.27},
      {Item: 'Tomatoes Grape', id: 10, Cost: 2.99},
      {Item: 'Lettuce Iceberg', id: 11, Cost: 2.49},
      {Item: 'Subtotal', id: 12, Cost: 39.2},
      {Item: 'Subtotal', id: 13, Cost: 24.2},
      {Item: 'Subtotal', id: 14, Cost: 24.2},
      {Item: 'Subtotal', id: 15, Cost: 24.2},
      {Item: 'Total.', id: 16, Cost: 24.2},
      {Item: 'Cash', id: 17, Cost: 50},
      {Item: '', id: 18, Cost: 25.8}
    ]
  }

  handleChange = e => {
    console.log(e.target)
    // e.target.disabled = true
    const [idx, itemOrCost] = e.target.name.split('-')
    const editedItem = {
      ...this.state.receiptsInfo[+idx],
      [itemOrCost]: e.target.value
    }
    const newReceiptsInfo = [...this.state.receiptsInfo]
    newReceiptsInfo[idx] = editedItem
    this.setState({receiptsInfo: newReceiptsInfo})
    // e.target.disabled = false
  }

  handleDisabled = e => {}

  render() {
    const {receiptsInfo} = this.state
    return (
      <div className="table-container">
        <form>
          {'Item :'}
          {'Cost :'}
          {receiptsInfo.map((receipt, idx) => (
            <div key={receipt.id}>
              <input
                name={`${idx}-Item`}
                type="text"
                value={receipt.Item || ''}
                onChange={this.handleChange}
              />
              <input
                name={`${idx}-Cost`}
                type="text"
                value={receipt.Cost || ''}
                onChange={this.handleChange}
              />
            </div>
          ))}
        </form>
      </div>
    )
  }
}

const mapState = state => ({
  // ocr: state.receipts.ocr,
  // originalOcr: state.receipts.originalOcr,
  // selectedGroup: state.groups.selectedGroup
})

const mapDispatch = dispatch => ({
  // saveReceipt: (groupId, table) => dispatch(saveReceiptThunk(groupId, table))
})

export default connect(mapState, mapDispatch)(SocketTable)
