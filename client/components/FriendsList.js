import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getFriendsThunk, deleteFriendThunk} from '../store'
import {List, ListItem} from 'semantic-ui-react'

class FriendsList extends Component {
  state = {
    componentMounted: false
  }
  componentDidMount = async () => {
    await this.props.getFriendsThunk(this.props.user.email)
    await this.setState({
      componentMounted: true
    })
  }
  render() {
    // console.log(this.props.friends)
    return (
      <div>
        <List>
          {this.props.friends[0] ? (
            this.props.friends.map(friend => {
              console.log(friend)
              return (
                <ListItem
                  key={friend.email}
                  onClick={() => this.onClick(friend.email)}
                >
                  {friend.name}
                </ListItem>
              )
            })
          ) : this.state.componentMounted ? (
            <h3>You have no friends.</h3>
          ) : (
            <h3>Loading...</h3>
          )}
        </List>
      </div>
    )
  }
}

const mapState = state => ({
  friends: state.friends.friends,
  user: state.user
})

const mapDispatch = dispatch => ({
  getFriendsThunk: userId => dispatch(getFriendsThunk(userId)),
  deleteFriendThunk: (email, myEmail) =>
    dispatch(deleteFriendThunk(email, myEmail))
})

export default connect(mapState, mapDispatch)(FriendsList)
