import { combineReducers } from 'redux'
import user from './user/reducer'
import charge from './charge/reducer'

export default combineReducers({ user, charge })
