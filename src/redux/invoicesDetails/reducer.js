import invoicesDetails from "../../data/invoicesDetails";
import types from "./types";

const INITIAL_STATE={
  invoicesDetails:invoicesDetails,
  invoiceDetails:[],
  invoiceDetail:-1
}

export default (state=INITIAL_STATE,action)=>{
  switch(action.type){
    case types.CREATE_INVOICE_DETAIL:
      return {
        ...state,
        invoicesDetails:[...state.invoicesDetails,action.payload],
        invoiceDetail:action.payload.id
      }
    case types.GET_INVOICE_DETAILS:
      const res=state.invoicesDetails.filter(i=>
        i.invoice==action.payload)
      return {
        ...state,
        invoiceDetails:res,
        invoiceDetail:res[0]?res[0].id:-1
      }
    case types.SET_INVOICE_DETAIL:
      return {
        ...state,
        invoiceDetail:action.payload
      }

    case types.EDIT_INVOICE_DETAIL:
      return {
        ...state,
        invoicesDetails:state.invoicesDetails.map(e=>{
          if(e.id==action.payload.id){
            return {...e,quantity:action.payload.quantity}
          }else
            return e
        }),
        invoiceDetails:state.invoiceDetails.map(e=>{
          if(e.id==action.payload.id){
            return {...e,quantity:action.payload.quantity}
          }else{
            return e
          }
        }),
        invoiceDetail:action.payload.id
      }
    case types.DELETE_INVOICE_DETAIL:
      return {
        ...state,
        invoicesDetails:state.invoicesDetails.filter(
          e=>e.id!==action.payload
        ),
        invoiceDetails:state.invoiceDetails.filter(
          e=>e.id!=action.payload
        )
      }
    default:
      return state
  }
}