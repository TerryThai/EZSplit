import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Form, Icon} from 'semantic-ui-react'
import {updateTip} from '../../store/receipts'

class Tip extends Component {
  state = {
    customTip: 0
  }

  // the tip function is made to follow the DRY approach
  // the function takes the value of each button and coerces it
  // to a number. Afterwards, the tip amount is caluclated.
  // this function makes use of the existing getOcr() that exists in the store
  // we the getOcr() a 'new' receipt object and it will trigger a state change
  // once that state change occurs, the component can rerender

  tip = event => {
    const tipAmount = 1 + Number(event.target.value) * 0.01
    const newItems = [...this.props.originalOcr.amounts]
    const copyOfItems = newItems.map(item => {
      const copyItem = {...item}
      copyItem.Cost = (copyItem.Cost * tipAmount).toFixed(2)
      return copyItem
    })
    this.props.updateOcr(copyOfItems)
  }

  handleCustomTipClick = event => {
    const customValue = event.target.value
    if (!Number(customValue) && customValue !== 0) {
      this.setState({customTip: 0})
    } else {
      this.setState({customTip: Number(event.target.value)})
    }
  }

  render() {
    return (
      <Button.Group size="tiny">
        <Button size="tiny" color="black" onClick={this.tip} value={15}>
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
        <Button.Or />
        <Button
          name="customTip"
          color="black"
          onClick={this.tip}
          value={this.state.customTip}
        >
          Custom Tip
          <Icon name="arrow right" />
        </Button>
        <Form size="tiny" id="custom">
          <Form.Field
            control="input"
            placeholder="Custom Tip"
            onChange={this.handleCustomTipClick}
            value={this.state.customTip}
          />
        </Form>
      </Button.Group>
    )
  }
}

const mapDispatch = dispatch => ({
  updateTipToStore: newCostsWithTip => dispatch(updateTip(newCostsWithTip))
})

export default connect(null, mapDispatch)(Tip)
