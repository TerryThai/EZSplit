import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getFriendsThunk, deleteFriendThunk, addFriendThunk} from '../store'
import {
  List,
  ListItem,
  Button,
  Icon,
  Form,
  Message,
  Checkbox
} from 'semantic-ui-react'
import {Readqr} from './index'
class FriendsList extends Component {
  state = {
    componentMounted: false,
    showform: [false, false],
    name: '',
    email: '',
    checked: false
  }

  toggle = () => this.setState({checked: !this.state.checked})

  handleAddEmail = email => {
    this.props.addFriendThunk(this.props.user.email, email)
  }

  handleAddManual = (email, name) => {
    this.props.addFriendThunk(this.props.user.email, email, name)
  }

  handleDeleteFriend = async email => {
    this.props.deleteFriendThunk(email, this.props.user.email)
    await this.props.getFriendsThunk(this.props.user.email)
  }

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit = async () => {
    event.preventDefault()
    await this.props.addFriendThunk(
      this.props.user.email,
      this.state.email,
      this.state.name
    )
    this.setState({
      ...this.state,
      showform: [false, false],
      name: '',
      email: ''
    })
  }

  // toggle add-friend form
  toggleForm = (email, both) => {
    let newform = this.state.showform
    if (!!email && !!both) {
      if (!newform[1]) {
        newform = [true, true]
      } else if (newform[1]) {
        newform = [false, false]
      }
    } else if (email && !both) {
      if (newform[0] && newform[1]) {
        newform = [true, false]
      } else {
        newform = [!newform[0], false]
      }
    }
    this.setState({
      showform: newform
    })
  }

  componentDidMount = async () => {
    await this.props.getFriendsThunk(this.props.user.email)
    await this.setState({
      componentMounted: true
    })
  }
  render() {
    return (
      <div className="column-center">
        <br />
        <List
          celled
          verticalAlign="middle"
          style={{
            width: '80%',
            maxWidth: '450px'
          }}
        >
          {this.props.friends[0] ? (
            this.props.friends.map(friend => {
              return (
                <ListItem key={Math.random()}>
                  <List.Content floated="left">
                    <List.Header>{friend.name}</List.Header>
                    <List.Description>
                      Does this friend owe you money?
                    </List.Description>
                  </List.Content>
                  <Button
                    icon
                    size="tiny"
                    floated="right"
                    onClick={() => this.handleDeleteFriend(friend.email)}
                  >
                    <Icon name="trash alternate" color="blue" />
                  </Button>
                </ListItem>
              )
            })
          ) : this.state.componentMounted ? (
            <h3>You have no friends.</h3>
          ) : (
            <h3>Loading...</h3>
          )}
        </List>
        Add friend by
        <Button.Group color="black" style={{width: '80%', maxWidth: '450px'}}>
          <Button onClick={() => this.toggleForm(1)}>email</Button>
          <Button.Or />
          <Button positive onClick={() => this.toggleForm(1, 1)}>
            name & email
          </Button>
        </Button.Group>
        <Form onSubmit={this.handleSubmit}>
          {this.state.showform[0] &&
            this.state.showform[1] && (
              <Form.Field>
                <label>Name</label>
                <input
                  type="text"
                  placeholder={"Friend's name"}
                  name="name"
                  onChange={this.handleChange}
                  value={this.state.name}
                />
              </Form.Field>
            )}
          {this.state.showform[0] && (
            <Form.Field>
              <label>Email</label>
              <input
                type="text"
                placeholder={"Friend's email"}
                name="email"
                onChange={this.handleChange}
                value={this.state.email}
              />
            </Form.Field>
          )}
          {this.state.showform[0] && <Button type="submit">Submit</Button>}
        </Form>
        <Button onClick={this.toggle}>Toggle QR Scanner</Button>
        {this.state.checked ? <Readqr toggle={this.toggle} /> : ''}
        {this.props.errorMsg && (
          <Message error style={{width: '80%', maxWidth: '450px'}}>
            {this.props.errorMsg}
          </Message>
        )}
      </div>
    )
  }
}

const mapState = state => ({
  friends: state.friends.friends,
  errorMsg: state.friends.errorMsg,
  user: state.user
})

const mapDispatch = dispatch => ({
  getFriendsThunk: userId => dispatch(getFriendsThunk(userId)),
  deleteFriendThunk: (email, myEmail) =>
    dispatch(deleteFriendThunk(email, myEmail)),
  addFriendThunk: (myEmail, friendEmail, friendName) =>
    dispatch(addFriendThunk(myEmail, friendEmail, friendName))
})

export default connect(mapState, mapDispatch)(FriendsList)
