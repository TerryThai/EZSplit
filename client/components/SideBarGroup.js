import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getGroupsThunk} from '../store/groups'
import {Divider, Dropdown} from 'semantic-ui-react'
import {Table, CreateGroupSideBar} from '../components/index'

class SideBarGroup extends Component {
  state = {
    selectedGroup: ''
  }

  async componentDidMount() {
    await this.props.getGroupsThunk(this.props.user.email)
  }

  onChange = (event, {value}) => {
    this.setState({selectedGroup: value})
  }

  render() {
    const lineItems = this.props.groups.map(group => {
      return {
        key: group._id,
        text: group.name,
        value: group._id
      }
    })
    return (
      <div className="table-sidebar-container">
        <div className="sidebar-container">
          <Dropdown
            onChange={this.onChange}
            placeholder="Select Group"
            search
            selection
            options={lineItems}
          />
          <CreateGroupSideBar />
        </div>

        <Table groupId={this.state.selectedGroup} />
      </div>
    )
  }
}
//
const mapState = state => ({
  groups: state.groups.groups,
  user: state.user
})

const mapDispatch = dispatch => ({
  getGroupsThunk: userId => dispatch(getGroupsThunk(userId))
})

export default connect(mapState, mapDispatch)(SideBarGroup)
