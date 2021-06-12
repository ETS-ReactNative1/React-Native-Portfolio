import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const ADD_WATCHLIST = 'GET_WATCHLIST';
export const ADD_FAVORITE_ITEM = 'ADD_FAVORITE_ITEM';
export const REMOVE_FAVORITE_ITEM = 'REMOVE_FAVORITE_ITEM';
export const REMOVE_WATCHLIST = 'REMOVE_WATCHLIST';

export const getProfileWatchlist = () => {
  return dispatch => {
    AsyncStorage.getItem('token', (err, userToken) => {
      console.log('userT', userToken);
      axios({
        method: 'GET',
        url: 'https://team-a.gabatch11.my.id/user/myUserProfile',
        headers: {Authorization: `bearer ${userToken}`},
      })
        .then(({data}) => {
          console.log('watchlist',data.data.watchlist)
          dispatch({
            type: ADD_WATCHLIST,
            payload: data.data.watchlist,
          });
        })
        .catch(err => console.log(err.message));
    });
  };
};

export const addFavorite = movie => dispatch => {
  dispatch({
    type: ADD_FAVORITE_ITEM,
    payload: movie,
  });
};

export const removeFavorite = movie => dispatch => {
  dispatch({
    type: REMOVE_FAVORITE_ITEM,
    payload: movie,
  });
};

export const addWatchlist = movie => dispatch => {
  dispatch({
    type: ADD_WATCHLIST,
    payload: movie,
  });
};

export const removeWatchlist = movie => dispatch => {
  dispatch({
    type: REMOVE_WATCHLIST,
    payload: movie,
  });
};