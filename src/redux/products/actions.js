import types from "./types";


export const allCategories=()=>({
  type:types.ALL_CATEGORIES
})

export const fetchCategories=(category)=>({
  type:types.FETCH_CATEGORIES,
  payload:category
})

export const setCategories=(payload)=>({
  type:types.SET_CATEGORIES,
  payload
})

export const searchCategories=(payload)=>({
  type:types.SEARCH_CATEGORIES,
  payload

})
export const setSearchCategories=(payload)=>({
  type:types.SET_SEARCH_CATEGORIES,
  payload
})

export const createProduct=(payload)=>({
  type:types.CREATE_PRODUCT,
  payload
})

export const addProduct=(payload)=>({
  type:types.ADD_PRODUCT,
  payload
})

export const getProductCategories=(payload)=>({
  type:types.GET_PRODUCT_CATEGORIES,
  payload
})

export const fetchFilterResults=(payload)=>({
  type:types.FETCH_FILTER_RESULTS,
  payload
})