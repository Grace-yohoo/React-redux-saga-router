import {
    createStore,
    combineReducers,
    applyMiddleware
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import Mysaga from './saga/index'
import reduce from './Reducer'

const SagaMiddleware = createSagaMiddleware()

const store = createStore(combineReducers(reduce),applyMiddleware(SagaMiddleware));


SagaMiddleware.run(Mysaga)

console.log(store.getState())
export default store;