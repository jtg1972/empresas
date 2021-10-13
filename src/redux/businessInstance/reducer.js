import businessInstance from "../../data/businessInstance";
import { orderBusiness } from "../business/business.helpers";
import types from "./types";

const INITIAL_STATE={
  businessesInstances:orderBusiness(businessInstance),
  businessInstances:[],
  errorCreateBusinessInstance:"",
  successCreateBusinessInstance:false
}

export default (state=INITIAL_STATE,action)=>{
  switch(action.type){
    case types.ADD_BUSINESS_INSTANCE:
      return {...state,
        businessesInstances:orderBusiness([...state.businessesInstances,action.payload])
      }
    case types.SET_BUSINESS_INSTANCES:
      return {
        ...state,
        businessInstances:action.payload

      }
    case types.RESET_CREATE_BUSINESS_INSTANCE:
      return {
        ...state,
        successCreateBusinessInstance:false,
        errorCreateBusinessInstance:""
      }

    case types.ERROR_ADD_BUSINESS_INSTANCE:
      return {
        ...state,errorCreateBusinessInstance:action.payload
      }
    case types.SUCCESS_ADD_BUSINESS_INSTANCE:
      return {
        ...state,
        successCreateBusinessInstance:action.payload
      }

    default:
      return state;
  }
}