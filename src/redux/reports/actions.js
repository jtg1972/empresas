import types from './types'


export const addQueryField=(payload)=>({
  type:types.ADD_QUERY_FIELD,
  payload
})

export const removeQueryField=(payload)=>({
  type:types.REMOVE_QUERY_FIELD,
  payload
})
export const addQueryGroup=(payload)=>({
  type:types.ADD_QUERY_GROUP,
  payload
})

export const removeQueryGroup=(payload)=>({
  type:types.REMOVE_QUERY_GROUP,
  payload
})

export const createReport=(payload)=>({
  type:types.CREATE_REPORT,
  payload
})

export const selectCategoryReports=(payload)=>({
  type:types.SELECT_CATEGORY_REPORTS,
  payload
})
export const runReport=(payload)=>({
  type:types.RUN_REPORT,
  payload
})

export const getReport=(payload)=>({
  type:types.GET_REPORT,
  payload
})


