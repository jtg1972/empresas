import types from "./types"
import {call,all,put,takeLatest} from 'redux-saga/effects'
import { orderBusiness } from "../business/business.helpers"
import { addProduct, setCategories, setSearchCategories } from "./actions";
/*
export function* fetchCategories({payload}){
  console.log("payload",payload)
  if(payload.category==-1){
    yield put(setCategories(payload.data))
  }else{
    const cats=payload.data.filter(cat=>
      cat.category==payload.category
    )
    const catOrdered=orderBusiness(cats);
    yield put(setCategories(catOrdered));

  }

}

export function* onFetchCategories(){
  yield takeLatest(types.FETCH_CATEGORIES,fetchCategories)
}*/

export function* createProduct({payload}){
  yield put(addProduct(payload))

}

export function* onCreateProduct(){
  yield takeLatest(types.CREATE_PRODUCT,createProduct)
}

export function* searchCategories({payload}){
  const filteredData=payload.data.filter(cat=>cat.name.includes(payload.search))
  const orderedFilteredData=orderBusiness(filteredData);
  yield put(setSearchCategories(orderedFilteredData))
}

export function* onSearchCategories(){
  yield takeLatest(types.SEARCH_CATEGORIES,searchCategories)
}

export default function* productSaga(){
  yield all([//call(onFetchCategories),
            call(onSearchCategories),
            call(onCreateProduct)
          ])
  
}