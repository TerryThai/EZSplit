import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getFriendsThunk, createGroupThunk} from '../store'
import {Button, Icon, List, ListItem, Dropdown, Input} from 'semantic-ui-react'

class CreateGroupSideBar extends Component {
  state = {
    name: '',
    users: []
  }

  addUser = (event, {value}) => {
    console.log('adduser', value)
    this.setState({
      users: [
        {name: this.props.user.name, email: this.props.user.email},
        ...value
      ]
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
    this.setState({name: '', users: []})
  }

  friendOptions = () => {
    return this.props.friends.map(friend => {
      return {
        key: friend._id,
        text: friend.name,
        value: friend
      }
    })
  }

  async componentDidMount() {
    await this.props.getFriendsThunk(this.props.user.email)
  }

  render() {
    const style = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
    return (
      <div style={style}>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="groupName">
            <h4>Group Name</h4>
          </label>
          <br />
          <Input
            type="text"
            id="groupName"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            placeholder="Group Name"
          />{' '}
          <Button content="Create Group" primary />
          <br />
          <label htmlFor="addUsers">
            <h4>Add Friends:</h4>
          </label>
          {this.props.friends[0] ? (
            <Dropdown
              options={this.friendOptions()}
              placeholder="Add"
              fluid
              multiple
              selection
              onChange={this.addUser}
            />
          ) : (
            <h3>Loading...</h3>
          )}
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
