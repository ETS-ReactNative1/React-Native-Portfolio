import ReduxThunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducer/combineReducer'


export let store = createStore(rootReducer,applyMiddleware(ReduxThunk))
