import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getFriendsThunk, createGroupThunk, findGroupName} from '../store'
import history from '../history'
import {
  Button,
  Icon,
  List,
  ListItem,
  Grid,
  Image,
  Form,
  Message
} from 'semantic-ui-react'

// TODO
// leave group action? remove user from group.users, remove group from user.groups
// react-modal? leave group button: confirmation

class CreateGroup extends Component {
  state = {
    componentMounted: false,
    name: '',
    users: [{name: this.props.user.name, email: this.props.user.email}],
    errorMsg: ''
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
    // validation:
    // --ensure name is not blank
    if (this.state.name) {
      // --ensure name is not taken
      let nameTaken = this.props.groups.filter(
        group => group.name === this.state.name
      )
      if (nameTaken.length) {
        await this.setState({
          errorMsg: 'This name is taken already!'
        })
      } else {
        await this.props.createGroupThunk(this.state)
        this.setState({
          componentMounted: false,
          name: '',
          users: [{name: this.props.user.name, email: this.props.user.email}],
          errorMsg: ''
        })
        if (this.props.redir) {
          history.push(`/${this.props.redirUrl}`)
        }
      }
    }
  }

  async componentDidMount() {
    this.props.getFriendsThunk(this.props.user.email)
    await this.setState({
      componentMounted: true
    })
  }

  render() {
    const style = {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center'
    }
    return (
      <Grid rows={2} verticalAlign="middle" relaxed="very" stackable>
        <Grid.Row style={style}>
          <h3>Create a Group</h3>
          <Form onSubmit={this.handleSubmit} style={{width: '50%'}}>
            <input
              type="text"
              id="groupName"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              placeholder="Group Name"
            />{' '}
            <Button content="create group" color="black" fluid />
            {this.state.errorMsg && <Message>{this.state.errorMsg}</Message>}
          </Form>
          <h3>Your Friends:</h3>
          {this.props.friends[0] ? (
            <List divided verticalAlign="middle" style={{width: '50%'}}>
              {this.props.friends.map((friend, idx) => {
                if (
                  this.state.users.filter(user => {
                    return user.email === friend.email
                  })[0]
                ) {
                  return null
                } else {
                  return (
                    <ListItem key={idx}>
                      <List.Content>{friend.name}</List.Content>
                      <List.Content floated="right">
                        <Button
                          size="tiny"
                          icon
                          basic
                          onClick={() => this.addUser(friend)}
                        >
                          <Icon name="add circle" color="black" />
                        </Button>
                      </List.Content>
                    </ListItem>
                  )
                }
              })}
            </List>
          ) : this.state.componentMounted ? (
            <h3>You have no friends yet.</h3>
          ) : (
            <h3>Loading...</h3>
          )}
          {/* option: use QR code to add friend */}
          {/* add friend logic: every time scan friend, if does not exist in friends list, add to friends list */}
        </Grid.Row>
        <hr />
        <Grid.Row style={style}>
          <h3>Added in Group:</h3>
          <List divided verticalAlign="middle" style={{width: '50%'}}>
            {this.state.users.map(user => {
              return (
                <ListItem key={user.email}>
                  <Image avatar src={user.imageUrl} floated="left" />
                  <List.Content>
                    {/* <p> */}
                    {user.name}{' '}
                    {user.email === this.props.user.email && '(Yourself!)'}
                    {/* </p> */}
                    <br />
                    {user.email !== this.props.user.email && (
                      <p>Balance with you: </p>
                    )}
                  </List.Content>
                  <List.Content floated="right">
                    {this.props.user.email !== user.email && (
                      <Button
                        size="tiny"
                        icon
                        basic
                        onClick={() => this.removeUser(user.email)}
                      >
                        <Icon name="trash alternate" color="black" />
                      </Button>
                    )}
                  </List.Content>
                </ListItem>
              )
            })}
          </List>
        </Grid.Row>
      </Grid>
    )
  }
}

const mapState = state => ({
  friends: state.friends.friends,
  user: state.user,
  errorMsg: state.groups.errorMsg,
  groups: state.groups.groups
})

const mapDispatch = dispatch => ({
  getFriendsThunk: email => dispatch(getFriendsThunk(email)),
  createGroupThunk: group => dispatch(createGroupThunk(group)),
  findGroupName: groupName => dispatch(findGroupName(groupName))
})

export default connect(mapState, mapDispatch)(CreateGroup)
