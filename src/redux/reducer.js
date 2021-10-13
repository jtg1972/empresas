import {combineReducers} from 'redux'
import businessReducer from './business/business.reducer'
import businessInstanceReducer from './businessInstance/reducer'
export default combineReducers({
  business:businessReducer,
  businessesInstances:businessInstanceReducer,
})