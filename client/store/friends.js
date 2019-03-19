import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const SELECT_FRIEND = 'SELECT_FRIEND'
const DELETE_FRIEND = 'DELETE_FRIEND'
const GET_FRIENDS = 'GET_FRIENDS'
const ADD_FRIEND = 'ADD_FRIEND'

/**
 * INITIAL STATE
 */
const initialState = {
  // selectedFriend: {},
  friends: []
}

/**
 * ACTION CREATORS
 */
// const selectFriend = friend => ({type: SELECT_FRIEND, friend})
const getFriends = friends => ({type: GET_FRIENDS, friends})
const deleteFriend = email => ({type: DELETE_FRIEND, email})
const addFriend = friend => ({type: ADD_FRIEND, friend})

/**
 * THUNK CREATORS
 */
// export const selectFriendThunk = email => async dispatch => {
//   try {
//     const res = await axios.get(`/api/friends/select/${email}`)

//     dispatch(selectFriend(friend))
//   } catch (error) {
//     console.error(error)
//   }
// }
export const addFriendThunk = (myEmail, friendEmail) => async dispatch => {
  try {
    const res = await axios.put('/api/friends/add', {myEmail, friendEmail})
    const friend = res.data.friend
    dispatch(addFriend(friend))
  } catch (error) {
    console.error(error)
  }
}

export const getFriendsThunk = email => async dispatch => {
  try {
    const res = await axios.get(`/api/friends/all/${email}`)
    const friends = res.data.friends
    dispatch(getFriends(friends))
  } catch (error) {
    console.error(error)
  }
}

export const removeFriendThunk = email => async dispatch => {
  try {
    await axios.delete('/api/user/friend', {email})
    dispatch(deleteFriend(email))
  } catch (error) {
    console.error(error)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    // case SELECT_FRIEND:
    //   return {...state, selectedFriend: action.friend}
    case ADD_FRIEND:
      return {...state, friends: [...state.friends, action.friend]}
    case GET_FRIENDS:
      return {...state, friends: action.friends}
    case DELETE_FRIEND:
      return {
        ...state,
        friends: state.friends.filter(friend => friend.email !== action.email)
      }
    default:
      return state
  }
}
