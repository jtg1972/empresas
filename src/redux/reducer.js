import {combineReducers} from 'redux'
import businessReducer from './business/business.reducer'
import businessInstanceReducer from './businessInstance/reducer'
import productReducer from './products/reducers'
import reportReducer from './reports/reducer'
import structureReducer from './structure/reducer'
import clientReducer from './clients/reducer'
import invoicesReducer from './invoices/reducer'
import invoiceDetailsReducer from './invoicesDetails/reducer'
export default combineReducers({
  business:businessReducer,
  businessesInstances:businessInstanceReducer,
  product:productReducer,
  structure:structureReducer,
  reports:reportReducer,
  clients:clientReducer,
  invoices:invoicesReducer,
  invoiceDetails:invoiceDetailsReducer
})