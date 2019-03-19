import React, {Component} from 'react'
import {connect} from 'react-redux'
import QrReader from 'react-qr-reader'

class Readqr extends Component {
  state = {
    result: 'No result'
  }

  handleScan = data => {
    if (data) {
      this.setState({
        result: data
      })
    }
  }

  handleError = err => {
    console.error(err)
  }

  componentDidMount() {
    console.log('Good Morning')
  }

  render() {
    return (
      <div
        align="center"
        style={{
          display: 'block',
          padding: '100px 0 0px 0'
        }}
      >
        {/* <QrReader
          delay={100}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{width: '20%'}}
        /> */}

        <div />
        <p>{this.state.result}</p>
        <div />
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user
})

export default connect(mapState, {})(Readqr)
