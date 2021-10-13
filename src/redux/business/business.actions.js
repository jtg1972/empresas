import businessTypes from "./business.types"

export const createBusiness=(business)=>({
  type:businessTypes.CREATE_BUSINESS,
  payload:business
})

export const addBusiness=(business)=>({
  type:businessTypes.ADD_BUSINESS,
  payload:business
})

export const sucessCreateBusiness=()=>({
  type:businessTypes.SUCCESS_CREATE_BUSINESS,
  payload:true
})
  
export const errorBusiness=(error)=>({
  type:businessTypes.ERROR_CREATE_BUSINESS,
  payload:error
})

export const resetCreateBusiness=()=>({
  type:businessTypes.RESET_CREATE_BUSINESS
})

export const fetchBusinesses=()=>({
  type:businessTypes.FETCH_BUSINESSES
})

export const setBusinesses=(businesses)=>({
  type:businessTypes.SET_BUSINESSES,
  payload:businesses
})

export const searchBusiness=(payload)=>({
  type:businessTypes.SEARCH_BUSINESS,
  payload:payload
})

export const setFilter=(payload)=>({
  type:businessTypes.SET_FILTER,
  payload
})

export const addBusinessInstance=(payload)=>({
  type:businessTypes.ADD_BUSINESS_INSTANCE,
  payload:payload
})