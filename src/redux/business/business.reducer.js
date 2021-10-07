import businessTypes from "./business.types";

const INITIAL_STATE={
  allBusiness:[],
  errorCreateBusiness:"",
  successCreateBusiness:false,
}

const businessReducer=(state=INITIAL_STATE,action)=>{
  switch (action.type) {
    case businessTypes.ADD_BUSINESS:
      return {...state,allBusiness:[...state.allBusiness,action.payload]}
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

    default:
      return state;
  }
}

export default businessReducer;