import {takeLatest,put,call,all} from 'redux-saga/effects'
import { addBusiness, errorBusiness, setFilter, sucessCreateBusiness } from './business.actions'
import { orderBusiness } from './business.helpers'
import businessTypes from './business.types'

export function* createBusiness({payload}){
  if(payload.name.trim()==""){
    yield put(errorBusiness("Name cant be empty"))
  }else{
    yield put(addBusiness(payload))
    yield put(sucessCreateBusiness(true))
  }
}


export function* onCreateBusinessStart(){
  yield takeLatest(businessTypes.CREATE_BUSINESS,createBusiness)
}

export function* fetchBusinesses(){
  
}

export function* onFetchBusinessesStart(){
  yield takeLatest(businessTypes.FETCH_BUSINESSES,fetchBusinesses)
}

export function* searchBusiness({payload}){
  const allData=orderBusiness(payload.data);
  const filteredData=allData.filter(b=>b.name.includes(payload.filter))
  yield put(setFilter(filteredData))
}

export function* onSearchBusiness(){
  yield takeLatest(businessTypes.SEARCH_BUSINESS,searchBusiness)

}

export function* addBusinessInstance(payload){
  
}

export function* onAddBusinessIntance(){
  yield takeLatest(businessTypes.ADD_BUSINESS_INSTANCE,
    addBusinessInstance)
}

export default function*businessSaga(){
  yield all([
    call(onCreateBusinessStart),
    call(onFetchBusinessesStart),
    call(onSearchBusiness)
  ])
  
  
}