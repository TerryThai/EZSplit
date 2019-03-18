import React, {Component} from 'react'
import {connect} from 'react-redux'
import QRCode from 'qrcode'
import {Button} from 'semantic-ui-react'

class Qrcode extends Component {
  componentDidMount() {
    QRCode.toCanvas(
      document.getElementById('canvas'),
      'amanthapar@gmail.com',
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
      <div>
        <h3>QR Code:</h3>
        <canvas id="canvas" align="center" />
        <Button
          inverted
          color="blue"
          onClick={() => {
            this.getQRLink('amanthapar@gmail.com')
          }}
        >
          URI
        </Button>
      </div>
    )
  }
}

const mapState = state => ({})

export default connect(mapState, {})(Qrcode)
