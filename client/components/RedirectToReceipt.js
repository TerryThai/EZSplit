import React, {Component} from 'react'
import history from '../history'

export default class RedirectToReceipt extends Component {
  componentDidMount() {
    const receipt = this.props.match.url
    localStorage.setItem('receipt', receipt)
    history.push('/')
  }

  render() {
    return null
  }
}
