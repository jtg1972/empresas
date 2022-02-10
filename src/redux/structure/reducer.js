import structure from '../../data/structure'
import structureProducts from '../../data/structureProducts'
import { addFieldCat, addMultCat,createStructureEmpty,editProduct,fetchFilterResults,getAllProductsFromCategoryDown,getFormFields,removeFieldCategory, searchProductsFromClient } from './helpers'
import types from './types'

const INITIAL_STATE={
  categoryStructures:structure,
  categoryStructure:{},
  formFields:[],
  products:structureProducts,
  productsFromStructure:[],
  fieldCriterias:[],
  fields:[],
  searchProductsFromStructure:[],
  structureClient:{},
  searchedProductsFromClient:[]
  //productsFromFilter:[]
}

const structureReducer=(state=INITIAL_STATE,action)=>{
  switch(action.type){
    
    case types.GET_STRUCTURE_CATEGORY:
      console.log("appp",action.payload)
      console.log("sest1",state.categoryStructures)
      const newCatStr=state.categoryStructures.find(c=>
        c.category==action.payload.category)
      console.log("newcatstr",newCatStr)
      const bcIds=action.payload.breadCrumb.map(g=>g.id)
      
      const gffields=getFormFields({
        data:state.categoryStructures,
        categories:bcIds,
        
      })
      const fields=gffields.map(fv=>{
        return fv.fields.map(m=>m.fieldName)
      })
      /*const pfs=state.products.filter(p=>
        p.category==action.payload.category)*/
      const gap=getAllProductsFromCategoryDown(state.products,action.payload.subCategories)
      return {...state,
        categoryStructure:newCatStr,
        formFields:gffields,
        productsFromStructure:gap,
        fields
    }
    case types.ADD_MULTIPLE_VALUE:

      console.log("sest",action.payload)
      //console.log("sestest",action.payload.data)
      const newCatSt=
        addMultCat(state.categoryStructures,action.payload)
      return {...state,
        categoryStructures:newCatSt,
        categoryStructure:newCatSt.filter(r=>r.category===action.payload.category)[0]
      }
    case types.ADD_FIELD_CATEGORY:
      console.log("Payloaddd1",action.payload)
      const nCS=
        addFieldCat(state.categoryStructures,state.products,state.productsFromStructure,action.payload)
      return {
        ...state,
        categoryStructures:nCS.resultado,
        categoryStructure:nCS.resultado.filter(r=>r.category==action.payload.category)[0],
        products:nCS.retProducts,
        productsFromStructure:nCS.retProductsFC      
      }
    case types.REMOVE_FIELD_CATEGORY:
      const rCF=removeFieldCategory(state.categoryStructures,state.productsFromStructure,state.products,action.payload)  
      
      return{
        ...state,
        categoryStructures:rCF.resultado,
        categoryStructure:rCF.resultado.filter(r=>r.category==action.payload.category)[0],
        productsFromStructure:rCF.retProductsFC,
        products:rCF.retProducts,
        /*
        fields:state.fields.map(n=>{
          if(n==action.payload.fieldName){
            return null
          }
          return n

          

        })*/
      }
    case types.CREATE_STRUCTURE_EMPTY:
      const cSE=createStructureEmpty(state.categoryStructures,action.payload)
      return{
        ...state,
        categoryStructures:cSE,
        categoryStructure:cSE.filter(r=>r.category==action.payload.category)[0]
      }
    case types.GET_FORM_FIELDS:
      const gFF=getFormFields(state.categoryStructures,action.payload)
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
        productsFromStructure:state.productsFromStructure.filter(np=>
          np.id!=action.payload.id)
      }
    case types.EDIT_PRODUCT_FROM_STRUCTURE:
      const nP=editProduct(state.products,action.payload)
      return {
        ...state,
        products:nP,
        productsFromStructure:state.productsFromStructure.map(np=>{
          if(np.id==action.payload.id){
            return action.payload
          } 
          else
            return np
          }
        )
          
      }
      
    /*case types.GET_ALL_PRODUCTS_FROM_CATEGORY_DOWN:
      const gap=getAllProductsFromCategoryDown(state.products,action.payload)
      return{
        ...state,
        productsFromStructure:gap
      }*/
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
        ...state,searchProductsFromStructure:fetchFilterResults(state.productsFromStructure,action.payload)
      }

    case types.DELETE_ALL_FILTERS:
      return {...state,fieldCriterias:[],
      searchProductsFromStructure:[]}
    case types.GET_STRUCTURE_CLIENT:
      console.log("payloadyx",action.payload)
      const xa=state.categoryStructures.find(
        c=>c.category==action.payload
      )
      console.log("xa",xa)
      return {...state,
        structureClient:xa
      }
    case types.SEARCH_PRODUCTS_FROM_CLIENT:
      const spfc=searchProductsFromClient(action.payload,state.products)
      return {
        ...state,
        searchedProductsFromClient:spfc
      }
    case types.CLEAN_SEARCH_PRODUCTS_FROM_CLIENT:
      return {
        ...state,
        searchedProductsFromClient:[]
      }
    default:
      return state;

  }
}

export default structureReducer