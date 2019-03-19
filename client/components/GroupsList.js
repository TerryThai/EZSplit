import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getGroupsThunk, leaveGroupThunk} from '../store/groups'
import BootstrapTable from 'react-bootstrap-table-next'
import cellEditFactory from 'react-bootstrap-table2-editor'
import {Divider} from 'semantic-ui-react'

// TODO
// leave group action? remove user from group.users, remove group from user.groups
// react-modal? leave group button: confirmation

class GroupsList extends Component {
  state = {
    componentMounted: false
  }

  handleLeaveGroup = (groupId, email) => {
    this.props.leaveGroupThunk(groupId, this.props.user.email)
    // show modal, modal action trigger leave group...
    // modal: Are you sure you want to leave {groupName}? yes/no
    // await this.props.leaveGroupThunk(this.props.user.id, groupId)
  }

  async componentDidMount() {
    this.props.getGroupsThunk(this.props.user.email)
    await this.setState({
      componentMounted: true
    })
  }

  render() {
    const lineItems =
      this.props.groups.map(group => {
        return {
          id: group._id,
          name: group.name,
          members: group.users.map((user, idx) => (
            <Link to={`users/${user.email}`} key={idx}>
              {user.name}{' '}
            </Link>
          )),
          leaveGroup: (
            <button onClick={() => this.handleLeaveGroup(group._id)}>X</button>
          )
        }
      }) || []

    const columns = [
      {
        dataField: 'name',
        text: 'Name'
      },
      {
        dataField: 'members',
        text: 'Members'
      },
      {
        dataField: 'leaveGroup',
        text: 'Leave Group'
      }
    ]

    const style = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }

    return (
      <div style={style}>
        <br />
        {this.props.groups[0] ? (
          <BootstrapTable
            // key={lineItems.key}
            keyField="id"
            data={lineItems}
            columns={columns}
            // cellEdit={cellEditFactory({mode: 'click'})}
          />
        ) : this.state.componentMounted ? (
          <h3>Join or Create a group</h3>
        ) : (
          <h3>Loading groups...</h3>
        )}
        <Divider />
        <Link to="/groups/create/redir">
          <h3>Create a group!</h3>
        </Link>
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
  leaveGroupThunk: (groupId, email) => dispatch(leaveGroupThunk(groupId, email))
})

export default connect(mapState, mapDispatch)(GroupsList)
