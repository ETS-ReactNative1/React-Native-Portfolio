import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import combineReducers from './reducers/combiner'
import sagas from './sagas/Sagas'

const sagaMiddleware = createSagaMiddleware();
const store = createStore(combineReducers,applyMiddleware(sagaMiddleware));

sagaMiddleware.run(sagas);

export default store;