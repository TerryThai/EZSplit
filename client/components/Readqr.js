import React, {Component} from 'react'
import {connect} from 'react-redux'
import QrReader from 'react-qr-reader'
import {Image} from 'semantic-ui-react'
import {addFriendThunk} from '../store/index'

class Readqr extends Component {
  state = {
    result: 'No result'
  }

  handleScan = async data => {
    if (data) {
      this.setState({
        result: data
      })
    }
    const obj = {
      myEmail: this.props.user.email,
      friendEmail: this.state.result
    }
    console.log('obj', obj)
    if (obj.friendEmail !== 'No result') {
      await this.props.addFriendThunk(obj.myEmail, obj.friendEmail)
      this.props.toggle()
    }
  }

  handleError = err => {
    console.error(err)
  }

  componentDidMount() {}

  render() {
    return (
      <div
        align="center"
        style={{
          display: 'block',
          padding: '100px 0 0px 0'
        }}
      >
        <QrReader
          delay={100}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{width: '200%'}}
        />

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

export default connect(mapState, {addFriendThunk})(Readqr)
