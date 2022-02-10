
import invoices from '../../data/invoices'
import types from './types'
import {searchInvoices} from './helpers'
const INITIAL_STATE={
  allInvoices:invoices,
  invoicesFromClient:[],
  searchedInvoices:[],
  currentInvoice:-1
}

export default (state=INITIAL_STATE,action)=>{
  switch(action.type){
    case types.GET_ALL_INVOICES:
      return state
    case types.GET_INVOICES_FROM_CLIENT:
      return {
        ...state,
        invoicesFromClient:state.allInvoices.filter(e=>
          e.client==action.payload),
          
      }

    case types.ADD_INVOICE:
      return {
        ...state,
        allInvoices:[...state.allInvoices,
        action.payload],
        invoicesFromClient:[
          ...state.invoicesFromClient,
          action.payload
        ],
        currentInvoice:action.payload.id

      }
    case types.SEARCH_INVOICES:


      return {
        ...state,
        searchedInvoices:searchInvoices(action.payload,state.invoicesFromClient)
      }
    case types.SET_CURRENT_INVOICE:
      return {
        ...state,
        currentInvoice:action.payload
      }
    default:
      return state
  }
}