import {all,call} from 'redux-saga/effects'
import businessSaga from './business/business.sagas'
import businessInstanceSaga from './businessInstance/sagas'
import productSaga from './products/sagas'
export default function* rootSaga(){
  yield all([
    call(businessSaga),
    call(businessInstanceSaga),
    call(productSaga),
  ])


}