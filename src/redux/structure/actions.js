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