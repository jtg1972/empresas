import types from './types'

export const getAllClients=(payload)=>({
  type:types.GET_ALL_CLIENTS,

})
export const addClient=(payload)=>({
  type:types.ADD_CLIENT,
  payload
})
export const setCurrentClient=(payload)=>({

  type:types.SET_CURRENT_CLIENT,
  payload
})
export const searchClients=(payload)=>({
  type:types.SEARCH_CLIENTS,
  payload
})