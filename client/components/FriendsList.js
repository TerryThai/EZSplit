import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getFriendsThunk} from '../store/groups'
import {List, ListItem} from 'semantic-ui-react'

class FriendsList extends Component {
  componentDidMount() {}
  render() {
    return (
      <div>
        <List>
          {this.props.friends[0] ? (
            this.props.friends.map(friend => {
              return (
                <ListItem onClick={() => this.onClick(friend.id)}>
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
  friends: state.groups.friends,
  user: state.user
})

const mapDispatch = dispatch => ({
  getFriendsThunk: userId => dispatch(getFriendsThunk(userId))
})

export default connect(mapState, mapDispatch)(FriendsList)
