import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getFriendsThunk, createGroupThunk} from '../store/user'

// TODO
// leave group action? remove user from group.users, remove group from user.groups
// react-modal? leave group button: confirmation

class CreateGroup extends Component {
  state = {
    componentMounted: false,
    groupName: '',
    users: []
  }

  addUser = async user => {
    await this.setState({
      users: this.state.users.push(user)
    })
  }

  removeUser = async userId => {
    await this.setState({
      users: this.state.users.filter(user => user.id !== userId)
    })
  }

  handleChange = async event => {
    await this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = async event => {
    event.preventDefault()
    await this.props.createGroupThunk(this.state)
    if (this.props.redir) {
      this.props.history.push('/addbill')
    }
  }

  async componentDidMount() {
    // this.props.getFriendsThunk(this.props.user.id)
    await this.setState({
      componentMounted: true
    })
  }

  render() {
    const style = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
    return (
      <div style={style}>
        <div>
          {this.state.users[0] ? (
            <div>
              <h3>Group Members:</h3>
              <ul>
                {this.state.users.map(user => {
                  return (
                    <li>
                      {user.name}
                      <button onClick={() => this.removeUser(user.id)}>
                        Remove
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          ) : (
            <h3>Add Members:</h3>
          )}
        </div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="groupName">Group Name</label>
          <br />
          <input
            type="text"
            id="groupName"
            name="groupName"
            value={this.state.groupName}
            onChange={this.handleChange}
            placeholder="Create a Group Name!"
          />
          <br />
          <label htmlFor="addUsers">Add Users</label>

          {this.props.friends[0] ? (
            <div>
              <ul>
                {this.props.friends.map(friend => {
                  return (
                    <li>
                      {friend.name}
                      <button onClick={() => this.addUser(friend)}>Add</button>
                    </li>
                  )
                })}
              </ul>
            </div>
          ) : this.state.componentMounted ? (
            <h3>You have no friends.</h3>
          ) : (
            <h3>Loading...</h3>
          )}
          {/* option: use QR code to add friend */}
          {/* add friend logic: every time scan friend, if does not exist in friends list, add to friends list */}
        </form>
      </div>
    )
  }
}

const mapState = state => ({
  friends: state.groups.friends,
  user: state.user.id
})

const mapDispatch = dispatch => ({
  getFriendsThunk: userId => dispatch(getFriendsThunk(userId)),
  createGroupThunk: userId => dispatch(createGroupThunk(userId))
})

export default connect(mapState, mapDispatch)(CreateGroup)
