import React from 'react'
import {Popup} from 'semantic-ui-react'
import {UploadImage} from '../index'
import {connect} from 'react-redux'

const style = {
  borderRadius: 0,
  opacity: 0.93,
  padding: '2em',
  backgroundColor: 'whitesmoke'
}

class PopupUpload extends React.Component {
  render() {
    return this.props.userReceipts.receipts &&
      this.props.userReceipts.receipts.length === 0 ? (
      <Popup
        trigger={<UploadImage />}
        content="Hi, welcome to ezsplit! To get started, upload a receipt!"
        on="click"
        style={style}
        open={true}
      />
    ) : (
      <UploadImage />
    )
  }
}

const mapState = state => ({
  userReceipts: state.receipts.userReceipts
})

export default connect(mapState)(PopupUpload)
