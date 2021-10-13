import {all,call} from 'redux-saga/effects'
import businessSaga from './business/business.sagas'
import businessInstanceSaga from './businessInstance/sagas'

export default function* rootSaga(){
  yield all([
    call(businessSaga),
    call(businessInstanceSaga)
  ])


}