import types from "../invoices/types";

export const getAllInvoices=()=>({
  type:types.GET_ALL_INVOICES
})

export const getInvoicesFromClient=(clientId)=>({
  type:types.GET_INVOICES_FROM_CLIENT,
  payload:clientId
})

export const addInvoice=(payload)=>({
  type:types.ADD_INVOICE,
  payload
})

export const searchInvoices=(payload)=>({
  type:types.SEARCH_INVOICES,
  payload
})

export const setCurrentInvoice=(payload)=>({
  type:types.SET_CURRENT_INVOICE,
  payload
})