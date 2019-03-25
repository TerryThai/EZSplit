import axios from 'axios'
import history from '../history'
import {helpers} from '../../helpers'

/**
 * ACTION TYPES
 */
const GET_OCR = 'GET_OCR'
const COPY_OF_OCR = 'COPY_OF_OCR'
const GET_HISTORY = 'GET_HISTORY'
const SAVE_RECEIPT = 'SAVE_RECEIPT'
const GET_RECEIPTS_BY_GROUP = 'GET_RECEIPTS_BY_GROUP'
const CLEAR_OCR = 'CLEAR_OCR'
const GET_RECEIPT = 'GET_RECEIPT'
const UPDATE_RECEIPT = 'UPDATE_RECEIPT'
const GET_RECEIPTS_BY_USER = 'GET_RECEIPTS_BY_USER'
const DELETE_ROW = 'DELETE_ROW'
const ADD_ROW = 'ADD_ROW'
const UPDATE_COST_WITH_TIP = 'UPDATE_COST_WITH_TIP'

/**
 * INITIAL STATE
 */
const initialState = {
  ocr: {},
  originalOcr: {},
  history: [],
  receipt: {},
  singleReceipt: {},
  groupReceipts: {},
  userReceipts: []
}
/**
 * ACTION CREATORS
 */
export const getOcr = ocr => ({type: GET_OCR, ocr})
export const copyOfOcr = originalOcr => ({type: COPY_OF_OCR, originalOcr})
export const saveReceipt = (groupId, table) => ({
  type: SAVE_RECEIPT,
  receipt: {groupId, table}
})
export const getReceipt = receipt => ({
  type: GET_RECEIPT,
  receipt
})

export const getReceiptsByGroup = groupReceipts => ({
  type: GET_RECEIPTS_BY_GROUP,
  groupReceipts
})
export const clearOCR = () => ({type: CLEAR_OCR})

export const updateReceipt = updatedReceipt => ({
  type: UPDATE_RECEIPT,
  data: updatedReceipt.data
})

export const getReceiptsByUser = ArrayOfReceipts => ({
  type: GET_RECEIPTS_BY_USER,
  userReceipts: ArrayOfReceipts
})
export const deleteRow = id => ({type: DELETE_ROW, id})
export const addRow = () => ({type: ADD_ROW})
export const updateTip = itemsWithUpdatedCost => ({
  type: UPDATE_COST_WITH_TIP,
  itemsWithUpdatedCost
})

/**
 * THUNK CREATORS
 */


export const updateReceiptThunk = (row, receiptId) => async dispatch => {
  try {
    console.log('thunk row: ', row)
    const res = axios.put(`/api/receipts/${receiptId}`, row)
    const receipt = res.data
    dispatch(updateReceipt(receipt))
  } catch (error) {
    console.error(error)
  }
}

export const getOcrThunk = image => async dispatch => {
  try {
    const b64 = await helpers.getBase64(image)
    const base64 = helpers.parseBase64(b64)
    const formData = new FormData()
    formData.append('file', image)
    formData.append('base64', base64)
    const {data: ocr} = await axios.post('/api/receipts/send', formData)

    // formatting the ocr data
    const lineItems = ocr.amounts
      ? ocr.amounts.map((item, idx) => {
          const formmatted = helpers.capitalize(item.text)
          const noDollah = helpers.removeDollarSign(formmatted)
          return {Items: noDollah, id: Math.random() + idx, Cost: item.data}
        })
      : {}
    ocr.amounts = lineItems
    dispatch(getOcr(ocr))
    dispatch(copyOfOcr(ocr))
  } catch (err) {
    console.error(err)
  }
}
export const getReceiptsByGroupFromServer = groupId => async dispatch => {
  try {
    const {data: groupReceipts} = await axios.get(`/api/receipts/${groupId}`)
    dispatch(getReceiptsByGroup(groupReceipts))
  } catch (err) {
    console.error(err)
  }
}
export const getSingleReceiptFromServer = receiptId => async dispatch => {
  try {
    const {data: receipt} = await axios.get(
      `/api/receipts/editReceipts/${receiptId}`
    )
    dispatch(getReceipt(receipt))
  } catch (err) {
    console.error(err)
  }
}

export const saveReceiptThunk = (
  groupId,
  table,
  uploader
) => async dispatch => {
  try {
    const {data: newReceipt} = await axios.post('/api/receipts/save', {
      groupId,
      table,
      uploader
    })
    dispatch(saveReceipt(newReceipt))
    history.push(`/editReceipt/${newReceipt._id}`)
  } catch (err) {
    console.error(err)
  }
}

export const getReceiptsByUserFromServer = email => async dispatch => {
  try {
    const {data: userReceipts} = await axios.get(`/api/receipts/user/${email}`)
    dispatch(getReceiptsByUser(userReceipts))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_OCR:
      if (Array.isArray(action.ocr)) {
        return {...state, ocr: {...state.ocr, amounts: action.ocr}}
      }
      return {...state, ocr: action.ocr}
    case COPY_OF_OCR:
      return {...state, originalOcr: action.originalOcr}
    case SAVE_RECEIPT:
      return {...state, receipt: action.receipt}
    case GET_RECEIPT:
      return {...state, singleReceipt: action.receipt}
    case GET_RECEIPTS_BY_GROUP:
      return {...state, groupReceipts: action.groupReceipts}
    case GET_RECEIPTS_BY_USER:
      return {...state, userReceipts: action.userReceipts}
    case CLEAR_OCR:
      return {...state, ocr: {}}
    case UPDATE_RECEIPT:
      return {...state, singleReceipt: {data: [...action.data.data]}}
    case DELETE_ROW:
      return {
        ...state,
        ocr: {
          ...state.ocr,
          amounts: state.ocr.amounts.filter(item => item.id !== action.id)
        },
        originalOcr: {
          ...state.originalOcr,
          amounts: state.originalOcr.amounts.filter(
            item => item.id !== action.id
          )
        }
      }
    case ADD_ROW:
      const newItem = {id: Math.random(), Items: '', Cost: 0}
      return {
        ...state,
        ocr: {
          ...state.ocr,
          amounts: [...state.ocr.amounts, newItem]
        },
        originalOcr: {
          ...state.originalOcr,
          amounts: [...state.originalOcr.amounts, newItem]
        }
      }
    case UPDATE_COST_WITH_TIP:
      return {
        ...state,
        ocr: {...state.ocr, amounts: action.itemsWithUpdatedCost}
      }
    default:
      return state
  }
}
