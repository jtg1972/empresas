import DisplaySubcategoriesCombo from "../../components/SearchSubcategories/DisplaySubcategoriesCombo.js";
import products from "../../data/products";
import { orderBusiness } from "../business/business.helpers";
import getBreadCrumb, { fetchCategories, getSubcategories, searchCategories } from "../products/helpers";
import types from "./types";

const INITAL_STATE={
  allCategories:products,
  categories:[],
  searchCategories:[],
  subCategories:[],
  //NUEVO
  category:{},
  breadCrumb:[]

}

export default (state=INITAL_STATE,action)=>{
  switch(action.type){
    

    //case types.ALL_CATEGORIES:
      //return state;
    case types.FETCH_CATEGORIES:
      const nc=fetchCategories(state.allCategories,action.payload)
      console.log("actionpayload",action.payload)
      console.log("nccc",nc)
      const newCat=state.allCategories.filter(cat=>
        cat.id==action.payload)[0]
      return {
        ...state,
        categories:nc,
        category:newCat,
        breadCrumb:getBreadCrumb(state.allCategories,newCat.id),
        subCategories:getSubcategories(state.allCategories,action.payload),
        searchCategories:[]
      }
    case types.SEARCH_CATEGORIES:
      return {...state,
        searchCategories:searchCategories(state.categories,action.payload)}
    case types.ADD_PRODUCT:
      return {...state,
        allCategories:orderBusiness([...state.allCategories,action.payload]),
      categories:orderBusiness([...state.categories,action.payload])}
    case types.GET_PRODUCT_CATEGORIES:
      console.log("params",state.allCategories,action.payload)
        return {...state,
          subCategories:getSubcategories(state.allCategories,action.payload)}

    //nuevas
    case types.GET_CATEGORY:
      return {...state,
      category:state.allCategories.filter(cat=>
        cat.id==action.payload)[0]}
    default:
      return state;
  }
}