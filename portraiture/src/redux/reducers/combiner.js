import {combineReducers} from 'redux';
import authReducer from './authReducer';
import packageReducer from './packageReducer';
import projectReducer from './projectReducer';
import collectionReducer from './collectionReducer';

export default combineReducers({
  authReducer,
  packageReducer,
  projectReducer,
  collectionReducer
});
