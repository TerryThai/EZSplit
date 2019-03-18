import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const SELECT_GROUP = 'SELECT_GROUP'
const CREATE_GROUP = 'CREATE_GROUP'
const GET_GROUPS = 'GET_GROUPS'
const LEAVE_GROUP = 'LEAVE_GROUP'
const GET_FRIENDS = 'GET_FRIENDS'

/**
 * INITIAL STATE
 */
const initialState = {
  user: {},
  selectedGroup: {},
  friends: [],
  groups: []
}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
export const selectGroup = groupId => ({type: SELECT_GROUP, groupId})
const createGroup = group => ({type: CREATE_GROUP, group})
const getGroups = groups => ({type: GET_GROUPS, groups})
const leaveGroup = groupId => ({type: LEAVE_GROUP, groupId})
const getFriends = friends => ({type: GET_FRIENDS, friends})

/**
 * THUNK CREATORS
 */
// export const getFriendsThunk = userId => async dispatch => {
//   try {
//     //const res = await axios.get(`users/${userId}/friends`)
//     // const friends = res.data
//     // dispatch(getFriends(friends))
//   } catch (error) {
//     console.error(error)
//   }
// }

export const leaveGroupThunk = (userId, groupId) => async dispatch => {
  try {
    // axios.put remove group from user.groups
    // axios.put remove user from group.users
    // dispatch(leaveGroup(groupId))
  } catch (error) {
    console.error(error)
  }
}

export const getGroupsThunk = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/users/${userId}/groups`)
    const groups = res.data
    dispatch(getGroups(groups))
  } catch (error) {
    console.error(error)
  }
}

export const createGroupThunk = groupObj => async dispatch => {
  try {
    const res = await axios.post(`/api/users/group`, groupObj)
    const group = res.data
    dispatch(createGroup(group))
  } catch (error) {
    console.error(error)
  }
}

export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || initialState.user))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_GROUP:
      return {
        ...state,
        groups: [...state.groups, action.group],
        selectedGroup: action.group
      }
    case SELECT_GROUP:
      return {
        ...state,
        selectedGroup: state.groups.filter(group => group.id === action.groupId)
      }
    case GET_FRIENDS:
      return {...state, friends: action.friends}
    case LEAVE_GROUP:
      return {
        ...state,
        groups: state.groups.filter(group => group.id !== action.groupId)
      }
    case GET_GROUPS:
      return {...state, groups: action.groups}
    case GET_USER:
      return {...state, user: action.user}
    case REMOVE_USER:
      return initialState
    default:
      return state
  }
}
