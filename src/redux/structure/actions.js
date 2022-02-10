import types from "./types";

export const fetchAllStructures=()=>({
  type:types.FETCH_ALL_STRUCTURES
})

export const getStructureCategory=(payload)=>({
  type:types.GET_STRUCTURE_CATEGORY,
  payload
})

export const addMultipleValue=(payload)=>({
  type:types.ADD_MULTIPLE_VALUE,
  payload
}) 

export const addFieldCategory=(payload)=>({
  type:types.ADD_FIELD_CATEGORY,
  payload
})

export const removeFieldCategory=(payload)=>({
  type:types.REMOVE_FIELD_CATEGORY,
  payload
})

export const createStructureEmpty=(payload)=>({
  type:types.CREATE_STRUCTURE_EMPTY,
  payload
})

export const getFormFields=(payload)=>({
  type:types.GET_FORM_FIELDS,
  payload
})

export const addProduct=(payload)=>({
  type:types.CREATE_PRODUCT_FROM_STRUCTURE,
  payload

})

export const getProductsFromStructure=(payload)=>({
  type:types.GET_PRODUCTS_FROM_STRUCTURE,
  payload
})

export const deleteProduct=(payload)=>({
  type:types.DELETE_PRODUCT_FROM_STRUCTURE,
  payload
})

export const editProduct=(payload)=>({
  type:types.EDIT_PRODUCT_FROM_STRUCTURE,
  payload
})

export const getAllProductsFromCategoryDown=(payload)=>({
  type:types.GET_ALL_PRODUCTS_FROM_CATEGORY_DOWN,
  payload
})

export const addFieldCriteria=(payload)=>({
  type:types.ADD_FIELD_CRITERIA,
  payload
})

export const removeFieldCriteria=(payload)=>({
  type:types.REMOVE_FIELD_CRITERIA,
  payload
})

export const fetchFilterResults=(payload)=>({
  type:types.FETCH_FILTER_RESULTS,
  payload
})

export const deleteAllFilters=()=>({
  type:types.DELETE_ALL_FILTERS
})

export const getStructureClient=(payload)=>{
  console.log("entro accion")
  return {
    type:types.GET_STRUCTURE_CLIENT,
    payload
  }
}

export const searchProductsFromClient=(payload)=>({
  type:types.SEARCH_PRODUCTS_FROM_CLIENT,
  payload
})

export const cleanSearchProductsFromClient=()=>({
  type:types.CLEAN_SEARCH_PRODUCTS_FROM_CLIENT
})


