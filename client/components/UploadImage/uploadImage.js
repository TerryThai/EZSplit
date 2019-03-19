import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getOcrThunk} from '../../store/receipts'
import {Button, Label, Divider, Grid} from 'semantic-ui-react'
import {Spinner, Table} from '../index'

class UploadImage extends Component {
  state = {
    isLoading: false
  }

  handleChange = async evt => {
    this.setState({isLoading: true})
    let file = evt.target.files[0]
    await this.props.getOcrThunk(file)
    this.setState({isLoading: false})
  }

  render() {
    return (
      <Grid>
        <Grid.Row centered>
          <Label as="label" basic htmlFor="upload">
            <Button
              circular
              color="black"
              icon="upload"
              size="small"
              label={{basic: true, content: 'Upload Receipt'}}
              labelPosition="right"
            />
            <input
              hidden
              id="upload"
              type="file"
              onChange={this.handleChange}
            />
          </Label>
        </Grid.Row>
        {this.state.isLoading ? <Spinner /> : <Table />}
        <Divider />
      </Grid>
    )
  }
}

const mapDispatch = dispatch => ({
  getOcrThunk: file => dispatch(getOcrThunk(file))
})

export default connect(null, mapDispatch)(UploadImage)