import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getFriendsThunk, createGroupThunk} from '../store'
import {Button, Icon, List, ListItem} from 'semantic-ui-react'

class CreateGroupSideBar extends Component {
  state = {
    name: '',
    users: [{name: this.props.user.name, email: this.props.user.email}]
  }

  addUser = user => {
    this.setState({
      users: [...this.state.users, user]
    })
  }

  removeUser = email => {
    this.setState({
      users: this.state.users.filter(user => user.email !== email)
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
  }

  async componentDidMount() {}

  render() {
    // const options = [{key: 'ux', text: 'User Experience', value: 'ux'}]

    //   <Dropdown
    //     placeholder="Skills"
    //     fluid
    //     multiple
    //     selection
    //     options={options}
    //   />

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
              <List celled>
                {this.state.users.map(user => {
                  return (
                    <ListItem key={user.email}>
                      {user.name}
                      {this.props.user.email !== user.email && (
                        <Button
                          size="tiny"
                          floated="right"
                          icon
                          onClick={() => this.removeUser(user.email)}
                        >
                          <Icon name="trash alternate" color="blue" />
                        </Button>
                      )}
                    </ListItem>
                  )
                })}
              </List>
            </div>
          ) : (
            <h3>Add Members:</h3>
          )}
        </div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="groupName">
            <h3>Group Name</h3>
          </label>
          <br />
          <input
            type="text"
            id="groupName"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            placeholder="Create a Group Name!"
          />{' '}
          <Button content="create group" primary />
          <br />
          <label htmlFor="addUsers">
            <h3>Add Users:</h3>
          </label>
          {this.props.friends[0] ? (
            <div>
              <ul>
                {this.props.friends.map((friend, idx) => {
                  if (
                    this.state.users.filter(user => {
                      return user.email === friend.email
                    })[0]
                  ) {
                    console.log('im inside & returning null')
                    return null
                  } else {
                    return (
                      <li key={idx}>
                        {friend.name}
                        <button
                          type="button"
                          onClick={() => this.addUser(friend)}
                        >
                          Add
                        </button>
                      </li>
                    )
                  }
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
  friends: state.friends.friends,
  user: state.user
})

const mapDispatch = dispatch => ({
  getFriendsThunk: email => dispatch(getFriendsThunk(email)),
  createGroupThunk: group => dispatch(createGroupThunk(group))
})

export default connect(mapState, mapDispatch)(CreateGroupSideBar)
