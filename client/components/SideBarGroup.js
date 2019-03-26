import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getGroupsThunk} from '../store/groups'
import {Table, CreateGroupSideBar, CreateGroup} from '../components/index'
import {Dropdown, Popup, Container} from 'semantic-ui-react'

const style = {
  borderRadius: 0,
  opacity: 0.93,
  padding: '2em',
  backgroundColor: 'whitesmoke'
}

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
        {this.props.userReceipts.receipts &&
        this.props.userReceipts.receipts.length ? (
          table
        ) : (
          <Popup
            trigger={<Table groupId={this.state.selectedGroup} />}
            content="Here is your receipt! Please verify and make changes."
            on="click"
            style={style}
            open={true}
            position="top center"
          />
        )}
        <Container className="sidebar-container">
          {!this.props.groups.length ? (
            <Popup
              trigger={
                <Dropdown
                  onChange={this.onChange}
                  placeholder="Select Group"
                  search
                  selection
                  options={groups}
                  style={{width: '50%'}}
                />
              }
              content="Please create a group and add your friends."
              on="click"
              // style={style}
              open={true}
              position="right center"
            />
          ) : (
            <Dropdown
              onChange={this.onChange}
              placeholder="Select Group"
              search
              selection
              options={groups}
              style={{width: '50%'}}
            />
          )}
          <CreateGroup groups={this.props.groups} />
        </Container>
      </div>
    )
  }
}
//
const mapState = state => ({
  groups: state.groups.groups,
  user: state.user,
  userReceipts: state.receipts.userReceipts
})

const mapDispatch = dispatch => ({
  getGroupsThunk: userId => dispatch(getGroupsThunk(userId))
})

export default connect(mapState, mapDispatch)(SideBarGroup)
