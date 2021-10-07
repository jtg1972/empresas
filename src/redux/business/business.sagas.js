import {takeLatest,put,call,all} from 'redux-saga/effects'
import { addBusiness, errorBusiness, sucessCreateBusiness } from './business.actions'
import businessTypes from './business.types'

export function* createBusiness({payload}){
  if(payload.trim()==""){
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

export default function*businessSaga(){
  yield all([
    call(onCreateBusinessStart),
    call(onFetchBusinessesStart),
  ])
  
  
}