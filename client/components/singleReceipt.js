import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next'

const SingleReceipt = props => {
  const lineItems = props.lineItems
  const columns = [
    {dataField: 'Items', text: 'Items'},
    {dataField: 'Cost', text: 'Cost'}
  ]
  return (
    <BootstrapTable keyField="id" data={lineItems} columns={columns} />
    // <div key={item.id}>
    //   <div>Items:{item.item}</div>
    //   <div>Cost:{item.Cost}</div>
    // </div>
  )
}

export default SingleReceipt
