import React, {Component} from 'react'
import {connect} from 'react-redux'
import {GroupsList} from './index'

class AddBill extends Component {
  state = {
    componentMounted: false
  }

  async componentDidMount() {
    // this.props.getGroupsThunk(this.props.user.id)
    await this.setState({
      componentMounted: true
    })
  }

  render() {
    return (
      <div>
        <GroupsList />
      </div>
    )
  }
}

const mapState = state => ({
  groups: state.groups.groups,
  user: state.user
})

const mapDispatch = dispatch => ({
  getGroupsThunk: userId => dispatch(getGroupsThunk(userId)),
  leaveGroupThunk: (userId, groupId) =>
    dispatch(leaveGroupThunk(userId, groupId))
})

export default connect(mapState, mapDispatch)(AddBill)
