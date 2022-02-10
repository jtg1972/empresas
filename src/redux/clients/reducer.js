import types from './types'
import clients from '../../data/clients'
const INITIAL_STATE={
  allClients:clients,
  currentClient:-1,
  searchedClients:[]

}

export default (state=INITIAL_STATE,action)=>{
  switch(action.type){
    case types.GET_ALL_CLIENTS:
      return state
    case types.ADD_CLIENT:
      console.log("ap",action.payload)
      return {
        ...state,
        allClients:[...state.allClients,
          action.payload],
        currentClient:action.payload.id
      }
    case types.SET_CURRENT_CLIENT:
      return {
        ...state,
        currentClient:action.payload
      }
    case types.SEARCH_CLIENTS:
      const searchClients=state.allClients.filter(
        c=>c.name.includes(action.payload)
      )
      return {
        ...state,
        searchedClients:searchClients
      }
    default:
      return state
  }
}