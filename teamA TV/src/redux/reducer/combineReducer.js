import {combineReducers} from 'redux';
import moviesReducer from './moviesReducer';
import loginReducer from './loginReducer';
import favoriteReducer from './favoriteReducer';
import reviewReducer from './reviewReducer';

export default combineReducers({
  moviesReducer,
  loginReducer,
  favoriteReducer,
  reviewReducer,
});
