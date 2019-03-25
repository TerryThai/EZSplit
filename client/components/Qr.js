import React, {Component} from 'react'
import {connect} from 'react-redux'
import QRCode from 'qrcode'
import {Button} from 'semantic-ui-react'

class Qrcode extends Component {
  componentDidMount() {
    QRCode.toCanvas(
      document.getElementById('canvas'),
      `${this.props.email}`,
      error => {
        if (error) console.error(error)
        console.log('success!')
      }
    )
  }
  getQRLink = async email => {
    try {
      console.log(await QRCode.toDataURL(email))
    } catch (err) {
      console.error(err)
    }
  }
  render() {
    return (
      <div className="qr">
        <canvas id="canvas" align="center" />
      </div>
    )
  }
}

const mapState = state => ({
  email: state.user.email
})

export default connect(mapState, {})(Qrcode)
