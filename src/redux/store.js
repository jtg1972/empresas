import {createStore,applyMiddleware} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import rootReducer from './reducer'
import createSagaMiddle from 'redux-saga'
import rootSaga from './rootSaga'
const sagaMiddleware=createSagaMiddle();
const middleware=[thunk,sagaMiddleware,logger];

export default createStore(rootReducer,{},applyMiddleware(...middleware))
sagaMiddleware.run(rootSaga)
