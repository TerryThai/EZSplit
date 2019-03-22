import axios from 'axios'
import history from '../history'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}
function parseBase64(base64) {
  let idx = base64.indexOf(',') + 1
  return base64.slice(idx)
}

/**
 * ACTION TYPES
 */
const GET_OCR = 'GET_OCR'
const GET_OCR_TWO = 'GET_OCR_TWO'
const GET_HISTORY = 'GET_HISTORY'
const SAVE_RECEIPT = 'SAVE_RECEIPT'
const GET_RECEIPTS_BY_GROUP = 'GET_RECEIPTS_BY_GROUP'
const CLEAR_OCR = 'CLEAR_OCR'
const GET_RECEIPT = 'GET_RECEIPT'
const UPDATE_RECEIPT = 'UPDATE_RECEIPT'

/**
 * INITIAL STATE
 */
const initialState = {
  ocr: {},
  originalOcr: {},
  history: [],
  receipt: {},
  singleReceipt: {},
  groupReceipts: {}
}
/**
 * ACTION CREATORS
 */
export const getOcr = ocr => ({type: GET_OCR, ocr})
export const getOcrTwo = originalOcr => ({type: GET_OCR_TWO, originalOcr})
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
export const updateReceipt = updatedData => ({
  type: UPDATE_RECEIPT,
  data: updatedData
})
/**
 * THUNK CREATORS
 */
export const getOcrThunk = image => async dispatch => {
  try {
    const b64 = await getBase64(image)
    const base64 = parseBase64(b64)
    const formData = new FormData()
    formData.append('file', image)
    formData.append('base64', base64)
    const {data: ocr} = await axios.post('/api/receipts/send', formData)
    console.log(ocr)
    dispatch(getOcr(ocr))
    dispatch(getOcrTwo(ocr))
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
    case GET_OCR_TWO:
      return {...state, originalOcr: action.originalOcr}
    case SAVE_RECEIPT:
      return {...state, receipt: action.receipt}
    case GET_RECEIPT:
      return {...state, singleReceipt: action.receipt}
    case GET_RECEIPTS_BY_GROUP:
      return {...state, groupReceipts: action.groupReceipts}
    case CLEAR_OCR:
      return {...state, ocr: {}}
    case UPDATE_RECEIPT:
      console.log('hit UPDATA_RECEIPT in reducer', action.data)
      return {...state, singleReceipt: {data: [...action.data]}}
    default:
      return state
  }
}
