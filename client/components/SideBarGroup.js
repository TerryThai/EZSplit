import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getGroupsThunk} from '../store/groups'
import {Table, CreateGroupSideBar, CreateGroup} from '../components/index'
import {Dropdown} from 'semantic-ui-react'

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
    const groups = this.props.groups.map(group => {
      return {
        key: group._id,
        text: group.name,
        value: group._id
      }
    })
    return (
      <div className="table-sidebar-container">
        <Table groupId={this.state.selectedGroup} />
        <div className="sidebar-container">
          <Dropdown
            onChange={this.onChange}
            placeholder="Select Group"
            search
            selection
            options={groups}
            style={{width: '50%'}}
          />
          <CreateGroup groups={this.props.groups}/>
        </div>
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
