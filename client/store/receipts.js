import axios from 'axios'

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
const GET_HISTORY = 'GET_HISTORY'

/**
 * INITIAL STATE
 */
const initialState = {
  ocr: {},
  history: []
}
/**
 * ACTION CREATORS
 */
const getOcr = ocr => ({type: GET_OCR, ocr})

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
      return {...state, ocr: action.ocr}
    default:
      return state
  }
}
