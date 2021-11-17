import structure from '../../data/structure'
import structureProducts from '../../data/structureProducts'
import { addFieldCat, addMultCat,createStructureEmpty,editProduct,fetchFilterResults,getAllProductsFromCategoryDown,getFormFields,removeFieldCategory } from './helpers'
import types from './types'

const INITIAL_STATE={
  categoryStructures:structure,
  categoryStructure:{},
  formFields:[],
  products:structureProducts,
  productsFromStructure:[],
  fieldCriterias:[],
  productsFromFilter:[]
}

const structureReducer=(state=INITIAL_STATE,action)=>{
  switch(action.type){
    case types.FETCH_ALL_STRUCTURES:
      return state;

    case types.GET_STRUCTURE_CATEGORY:
      console.log("sest1",action.payload.data)
      return {...state,categoryStructure:action.payload.data.find(
        cat=>cat.category==action.payload.category
      )}
    case types.ADD_MULTIPLE_VALUE:

      console.log("sest",action.payload)
      console.log("sestest",action.payload.data)
      const newCatSt=
        addMultCat(action.payload)
      return {...state,
        categoryStructures:newCatSt,
        categoryStructure:newCatSt.filter(r=>r.category===action.payload.category)[0]
      }
    case types.ADD_FIELD_CATEGORY:
      const nCS=
        addFieldCat(action.payload)
      return {
        ...state,
        categoryStructures:nCS,
        categoryStructure:nCS.filter(r=>r.category==action.payload.category)[0]
      }
    case types.REMOVE_FIELD_CATEGORY:
      const rCF=removeFieldCategory(action.payload)  
      return{
        ...state,
        categoryStructures:rCF,
        categoryStructure:rCF.filter(r=>r.category==action.payload.category)[0]
      }
    case types.CREATE_STRUCTURE_EMPTY:
      const cSE=createStructureEmpty(action.payload)
      return{
        ...state,
        categoryStructures:cSE,
        categoryStructure:cSE.filter(r=>r.category==action.payload.category)[0]
      }
    case types.GET_FORM_FIELDS:
      const gFF=getFormFields(action.payload)
      return {
        ...state,
        formFields:gFF
      }
    case types.CREATE_PRODUCT_FROM_STRUCTURE:
      return {
        ...state,
        products:[...state.products,action.payload],
        productsFromStructure:[...state.productsFromStructure,action.payload]
      }
    case types.GET_PRODUCTS_FROM_STRUCTURE:
      return {...state,
      productsFromStructure:state.products.filter(p=>
        p.category==action.payload.category)
      }
    case types.DELETE_PRODUCT_FROM_STRUCTURE:
      const newProducts=state.products.filter(p=>
        p.id!=action.payload.id)
      return {...state,
        products:newProducts,
        productsFromStructure:newProducts.filter(np=>
          np.category==action.payload.category)
      }
    case types.EDIT_PRODUCT_FROM_STRUCTURE:
      const nP=editProduct(state.products,action.payload)
      return {
        ...state,
        products:nP,
        productsFromStructure:nP.filter(np=>
          np.category==action.payload.category)
      }
      
    case types.GET_ALL_PRODUCTS_FROM_CATEGORY_DOWN:
      const gap=getAllProductsFromCategoryDown(state.products,action.payload)
      return{
        ...state,
        productsFromStructure:gap
      }
    case types.ADD_FIELD_CRITERIA:
      return {
        ...state,
        fieldCriterias:[...state.fieldCriterias,action.payload]
      }
    case types.REMOVE_FIELD_CRITERIA:
      return {
        ...state,
        fieldCriterias:[...state.fieldCriterias.filter(
          fc=>fc.fieldName!==action.payload
        )]
      }
    case types.FETCH_FILTER_RESULTS:
      return {
        ...state,productsFromFilter:fetchFilterResults(state.productsFromStructure,action.payload)
      }
    default:
      return state;

  }
}

export default structureReducer