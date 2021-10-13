import {takeLatest, call, all, put} from 'redux-saga/effects'

import { 
  errorAddBusinessInstance,
  addBusinessInstance,
  setBusinessInstances, 
  successAddBusinessInstance } 
from './actions'
import types from './types'

export function* createBusinessInstance({payload}){
  console.log("erntoaquiasd")
  if(payload.name.trim()==""){
    console.log("son iguales")
    yield put(errorAddBusinessInstance("Name cant be empty"))
  } else{
    console.log("son defierentes")
    yield put(addBusinessInstance(payload))
    yield put(successAddBusinessInstance(true))
  }

}

export function* onCreateBusinessInstance(){
  
  
  yield takeLatest(types.CREATE_BUSINESS_INSTANCE,createBusinessInstance)
  console.log("entro aqui")
}


export function* fetchBusinessInstances({payload}){
  console.log("Payload",payload)
  const filteredData=payload.data
    .filter(instance=>{
      console.log("ib",instance.business);
      console.log("plb",payload.business)
      return instance.business===payload.business
    })
  yield put(setBusinessInstances(filteredData))
}

export function* onFetchBusinessInstances(){
 yield takeLatest(types.FETCH_BUSINESS_INSTANCES,fetchBusinessInstances) 
}

export default function* businessInstanceSaga(){
  yield all([
    call(onFetchBusinessInstances),
    call(onCreateBusinessInstance)
  ])
}