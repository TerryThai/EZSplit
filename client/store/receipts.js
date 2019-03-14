import axios from 'axios'

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
  console.log(image)
  try {
    const formData = new FormData()
    formData.append('file', image)
    const config = {
      headers: {
        apikey: '1c9f54d045b211e9bba4c5572eb43161'
      }
    }
    const res = await axios.post(
      'https://api.taggun.io/api/receipt/v1/verbose/file',
      formData,
      config
    )
    console.log(res.data)
    dispatch(getOcr(res.data))
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
