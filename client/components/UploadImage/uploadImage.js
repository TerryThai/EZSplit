import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getOcrThunk} from '../../store/receipts'
import Table from '../Table/table'
import {Button, Label, Divider, Grid} from 'semantic-ui-react'

class UploadImage extends Component {
  state = {}

  handleChange = async evt => {
    let file = evt.target.files[0]
    await this.props.getOcrThunk(file)
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
        <Table />
        <Divider />
      </Grid>
    )
  }
}

const mapDispatch = dispatch => ({
  getOcrThunk: file => dispatch(getOcrThunk(file))
})

export default connect(null, mapDispatch)(UploadImage)
