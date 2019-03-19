import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import receipts from './receipts'
import groups from './groups'
import friends from './friends'

const reducer = combineReducers({user, receipts, groups, friends})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './groups'
export * from './user'
export * from './receipts'
export * from './friends'

