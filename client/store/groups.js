import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const SELECT_GROUP = 'SELECT_GROUP'
const CREATE_GROUP = 'CREATE_GROUP'
const GET_GROUPS = 'GET_GROUPS'
const LEAVE_GROUP = 'LEAVE_GROUP'
const ERROR_MESSAGE = 'ERROR_MESSAGE'

/**
 * INITIAL STATE
 */
const initialState = {
  selectedGroup: {},
  groups: [],
  errorMsg: ''
}

/**
 * ACTION CREATORS
 */
const selectGroup = group => ({type: SELECT_GROUP, group})
const createGroup = group => ({type: CREATE_GROUP, group})
const getGroups = groups => ({type: GET_GROUPS, groups})
const leaveGroup = groupId => ({type: LEAVE_GROUP, groupId})
// const errorMsg = msg => ({type: ERROR_MESSAGE, msg})
/**
 * THUNK CREATORS
 */

export const selectGroupThunk = groupId => async dispatch => {
  try {
    const res = await axios.get(`/api/groups/select/${groupId}`)
    dispatch(selectGroup(res.data))
  } catch (error) {
    console.error(error)
  }
}

export const leaveGroupThunk = (groupId, userEmail) => async dispatch => {
  try {
    const res = await axios.put(`/api/groups/${groupId}/${userEmail}`)
    dispatch(leaveGroup(res.data))
  } catch (error) {
    console.error(error)
  }
}

export const getGroupsThunk = email => async dispatch => {
  try {
    const res = await axios.get(`/api/groups/${email}/`)
    const groups = res.data
    dispatch(getGroups(groups))
  } catch (error) {
    console.error(error)
  }
}

export const createGroupThunk = groupObj => async dispatch => {
  try {
    const res = await axios.post(`/api/groups`, groupObj)
    const group = res.data
    dispatch(createGroup(group))
  } catch (error) {
    console.error(error)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    // case ERROR_MESSAGE:
    //   return {...state, errorMsg: action.msg}
    case CREATE_GROUP:
      return {
        ...state,
        groups: [...state.groups, action.group],
        selectedGroup: action.group,
        errorMsg: ''
      }
    case SELECT_GROUP:
      return {
        ...state,
        selectedGroup: action.group,
        errorMsg: ''
      }
    case LEAVE_GROUP:
      return {
        ...state,
        groups: state.groups.filter(group => group._id !== action.groupId)
      }
    case GET_GROUPS:
      return {...state, groups: action.groups}
    default:
      return state
  }
}
