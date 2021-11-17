import products from "../../data/products";
import { orderBusiness } from "../business/business.helpers";
import { getSubcategories } from "../products/helpers";
import types from "./types";

const INITAL_STATE={
  allCategories:products,
  categories:[],
  searchCategories:[],
  subCategories:[]

}

export default (state=INITAL_STATE,action)=>{
  switch(action.type){
    

    case types.ALL_CATEGORIES:
      return state;

    case types.SET_CATEGORIES:
      return {...state,categories:action.payload}
    case types.SET_SEARCH_CATEGORIES:
      return {...state,searchCategories:action.payload}
    case types.ADD_PRODUCT:
      return {...state,
        allCategories:orderBusiness([...state.allCategories,action.payload]),
      categories:orderBusiness([...state.categories,action.payload])}
    case types.GET_PRODUCT_CATEGORIES:
      console.log("params",state.allCategories,action.payload)
        return {...state,
          subCategories:getSubcategories(state.allCategories,action.payload)}
    default:
      return state;
  }
}