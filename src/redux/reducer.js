import {combineReducers} from 'redux'
import businessReducer from './business/business.reducer'

export default combineReducers({
  business:businessReducer
})