import types from "./types";

export const createInvoiceDetail=(payload)=>({
  type:types.CREATE_INVOICE_DETAIL,
  payload
})

export const getInvoiceDetails=(payload)=>({
  type:types.GET_INVOICE_DETAILS,
  payload
})

export const setInvoiceDetail=(payload)=>({
  type:types.SET_INVOICE_DETAIL,
  payload
})

export const editInvoiceDetail=(payload)=>({
  type:types.EDIT_INVOICE_DETAIL,
  payload
})

export const deleteInvoiceDetail=(payload)=>({
  type:types.DELETE_INVOICE_DETAIL,
  payload
})