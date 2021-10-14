import businessTypes from "./business.types";
import businesses from "../../data/business";
import { orderBusiness } from "./business.helpers";
const INITIAL_STATE={
  allBusiness:orderBusiness(businesses),
  errorCreateBusiness:"",
  successCreateBusiness:false,
  filteredData:[],
  
}

const businessReducer=(state=INITIAL_STATE,action)=>{
  switch (action.type) {
    case businessTypes.ADD_BUSINESS:
      return {...state,allBusiness:orderBusiness([...state.allBusiness,action.payload])}
    case businessTypes.SUCCESS_CREATE_BUSINESS:
      return {...state,successCreateBusiness:action.payload}

    case businessTypes.ERROR_CREATE_BUSINESS:
      return {...state,errorCreateBusiness:action.payload}
    case businessTypes.RESET_CREATE_BUSINESS:
      return {...state,
        errorCreateBusiness:"",
        successCreateBusiness:false,}
    case businessTypes.FETCH_BUSINESSES:
      return {...state}
    case businessTypes.SET_FILTER:
      return {...state,filteredData:action.payload}

    default:
      return state;
  }
}

export default businessReducer;