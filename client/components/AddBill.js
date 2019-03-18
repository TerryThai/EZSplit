import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Groups} from './index'

class AddBill extends Component {
  state = {
    componentMounted: false
  }

  async componentDidMount() {
    this.props.getGroupsThunk(this.props.user.id)
    await this.setState({
      componentMounted: true
    })
  }

  render() {
    return (
      <div>
        <Groups />
      </div>
    )
  }
}

const mapState = state => ({
  groups: state.user.groups,
  user: state.user.user.id
})

const mapDispatch = dispatch => ({
  getGroupsThunk: userId => dispatch(getGroupsThunk(userId)),
  leaveGroupThunk: (userId, groupId) =>
    dispatch(leaveGroupThunk(userId, groupId))
})

export default connect(mapState, mapDispatch)(AddBill)
