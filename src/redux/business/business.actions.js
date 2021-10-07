import businessTypes from "./business.types"

export const createBusiness=(name)=>({
  type:businessTypes.CREATE_BUSINESS,
  payload:name
})

export const addBusiness=(name)=>({
  type:businessTypes.ADD_BUSINESS,
  payload:name
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