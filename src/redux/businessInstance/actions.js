import types from "./types";

export const createBusinessInstance=(payload)=>({
  type:types.CREATE_BUSINESS_INSTANCE,
  payload
})

export const fetchBusinessInstances=(payload)=>({
  type:types.FETCH_BUSINESS_INSTANCES,
  payload
})

export const addBusinessInstance=(payload)=>({
  type:types.ADD_BUSINESS_INSTANCE,
  payload
})

export const setBusinessInstances=(payload)=>({
  type:types.SET_BUSINESS_INSTANCES,
  payload
})

export const errorAddBusinessInstance=(payload)=>({
  type:types.ERROR_ADD_BUSINESS_INSTANCE,
  payload
})

export const resetCreateBusinessInstance=()=>({
  type:types.RESET_CREATE_BUSINESS_INSTANCE
})

export const successAddBusinessInstance=(payload)=>({
  type:types.SUCCESS_ADD_BUSINESS_INSTANCE,
  payload:payload
})