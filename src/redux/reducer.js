import {combineReducers} from 'redux'
import businessReducer from './business/business.reducer'
import businessInstanceReducer from './businessInstance/reducer'
import productReducer from './products/reducers'
import structureReducer from './structure/reducer'
export default combineReducers({
  business:businessReducer,
  businessesInstances:businessInstanceReducer,
  product:productReducer,
  structure:structureReducer,
})