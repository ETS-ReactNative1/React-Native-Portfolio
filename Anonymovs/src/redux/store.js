import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import sagas from './saga/sagas';
import combineReducers from './reducer/combine'

const sagaMiddleware = createSagaMiddleware();
const store = createStore(combineReducers,applyMiddleware(sagaMiddleware));

sagaMiddleware.run(sagas);

export default store;