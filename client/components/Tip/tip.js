import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button} from 'semantic-ui-react'
import {getOcr} from '../../store/receipts'

class Tip extends Component {
  state = {}

  // the tip function is made to follow the DRY approach
  // the function takes the value of each button and coerces it
  // to a number. Afterwards, the tip amount is caluclated.
  // this function makes use of the existing getOcr() that exists in the store
  // we the getOcr() a 'new' receipt object and it will trigger a state change
  // once that state change occurs, the component can rerender
  tip = event => {
    const tipAmount = 1 + Number(event.target.value) * 0.01
    let newReceipt = {...this.props.ocr}
    newReceipt.amounts.forEach(item => {
      item.data *= tipAmount
    })
    this.props.updateOcr(newReceipt)
  }
  render() {
    return (
      <Button.Group>
        <Button color="black" onClick={this.tip} value={15}>
          15%
        </Button>
        <Button.Or />
        <Button color="black" onClick={this.tip} value={18}>
          18%
        </Button>
        <Button.Or />
        <Button color="black" onClick={this.tip} value={20}>
          20%
        </Button>
      </Button.Group>
    )
  }
}

const mapDispatch = dispatch => ({
  updateOcr: receipt => dispatch(getOcr(receipt))
})

export default connect(null, mapDispatch)(Tip)
