import React, {Component} from 'react'
import {connect} from 'react-redux'
import BootstrapTable from 'react-bootstrap-table-next'
import cellEditFactory from 'react-bootstrap-table2-editor'
import Tip from '../Tip/tip'
import {Button} from 'semantic-ui-react'
import {saveReceiptThunk, deleteRow, addRow} from '../../store/receipts'

class Table extends Component {
  handleDeleteRow = rowContent => {
    this.props.deleteRowFromTable(rowContent.id)
  }

  handleAddRow = () => {
    this.props.addRowToTable()
  }

  render() {
    const lineItems = this.props.ocr.amounts

    const columns = [
      {dataField: 'Items', text: 'Items'},
      {dataField: 'Cost', text: 'Cost'},
      {
        dataField: 'id',
        text: 'Remove',
        formatter: (rowIdx, rowContent) => {
          return (
            <button
              type="button"
              className="btn btn-danger btn-xs"
              onClick={() => this.handleDeleteRow(rowContent)}
            >
              Delete
            </button>
          )
        }
      }
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
          <div className="total-add-save-btn-contaniner">
            <div>total amount: {totalAmount.data}</div>
            <div>
              <Button primary onClick={() => this.handleAddRow()}>
                Add Row
              </Button>
              <Button
                color="black"
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
    dispatch(saveReceiptThunk(groupId, table, uploader)),
  deleteRowFromTable: deletIdx => dispatch(deleteRow(deletIdx)),
  addRowToTable: () => dispatch(addRow())
})

export default connect(mapState, mapDispatch)(Table)
