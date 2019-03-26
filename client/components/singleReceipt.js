import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next'

const SingleReceipt = props => {
  const lineItems = props.lineItems
  const columns = [
    {dataField: 'item', text: 'Items'},
    {dataField: 'cost', text: 'Cost'}
  ]
  return (
    <div>
      <BootstrapTable keyField="id" data={lineItems} columns={columns} />
    </div>
  )
}

export default SingleReceipt
