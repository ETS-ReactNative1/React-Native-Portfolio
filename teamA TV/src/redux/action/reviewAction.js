import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

export const GET_MOVIE_BY_IDMOVIE = 'GET_MOVIE_BY_IDMOVIE';
export const GET_MY_REVIEW = 'GET_MY_REVIEW';
export const REMOVE_MY_REVIEW = 'REMOVE_MY_REVIEW';
export const EDIT_REVIEW = 'EDIT_REVIEW';
export const POST_MY_REVIEW = 'POST_MY_REVIEW';

const REVIEW_MOVIE_BY_IDMOVIE =
  'https://team-a.gabatch11.my.id/movie/getReview/';
const IDMOVIE_TOTAL_PAGE = '?page=1&limit=3';
const REMOVE_MY_REVIEW_API = 'https://team-a.gabatch11.my.id/review/delete/';
const EDIT_MY_REVIEW = 'https://team-a.gabatch11.my.id/review/update/';
const MY_REVIEW_API = 'https://team-a.gabatch11.my.id/user/userGetReview';

export const getAllReviews = id => {
  return dispatch => {
    AsyncStorage.getItem('token', (err, tokenUser) => {
      if (tokenUser) {
        axios({
          method: 'GET',
          url: REVIEW_MOVIE_BY_IDMOVIE + id,
          headers: {Authorization: `Bearer ${tokenUser}`},
        })
          .then(({data}) => {
            // console.log('dataReview', data.data.docs);
            dispatch({
              type: GET_MOVIE_BY_IDMOVIE,
              payload: data.data.docs,
            });
          })
          .catch(err =>
            dispatch({
              type: GET_MOVIE_BY_IDMOVIE,
              payload: [],
            }),
          );
      } else {
        console.log('Unable to fetch all review by movies id');
      }
    });
  };
};

export const editMyReview = (id, _id, title, rating, review) => {
  return dispatch => {
    var qs = require('qs');
    AsyncStorage.getItem('token', (err, userToken) => {
      axios({
        method: 'PUT',
        url: EDIT_MY_REVIEW + _id,
        headers: {Authorization: `Bearer ${userToken}`},
        data: qs.stringify({
          title,
          movie_id: id,
          rating,
          review,
        }),
      })
        .then(({data}) => {
          dispatch(getMyReview(_id))
        })
        .catch(err => console.log(err.message));
    });
  };
};

export const getMyReview = () => {
  return dispatch => {
    AsyncStorage.getItem('token', (err, tokenUser) => {
      if (tokenUser) {
        axios({
          method: 'GET',
          url: MY_REVIEW_API,
          headers: {Authorization: `bearer ${tokenUser}`},
        })
          .then(({data}) => {
            console.log('dataReview', data.data.docs);
            dispatch({
              type: GET_MY_REVIEW,
              payload: data.data.docs,
            });
          })
          .catch(err =>
            dispatch({
              type: GET_MY_REVIEW,
              payload: [],
            }),
          );
      } else {
        console.log('Unable to fetch data');
      }
    });
  };
};

export const removeMyReview = id => {
  return dispatch => {
    AsyncStorage.getItem('token', (err, tokenUser) => {
      if (tokenUser) {
        axios({
          method: 'DELETE',
          url: REMOVE_MY_REVIEW_API + id,
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
            Authorization: `bearer ${tokenUser}`,
          },
        })
          .then(({data}) => {
            console.log('remove ada ?', data);
            dispatch(getMyReview(id))

          })
          .catch(err => console.log(err.message));
      } else {
        console.log('Unable to fetch data');
      }
    });
  };
};

export const postMyReview = (id, title, rating, review) => {
  return dispatch => {
    var qs = require('qs');
    AsyncStorage.getItem('token', (err, userToken) => {
      axios({
        method: 'POST',
        url: 'https://team-a.gabatch11.my.id/review/add',
        headers: {Authorization: `Bearer ${userToken}`},
        data: qs.stringify({
          title,
          movie_id: id,
          rating,
          review,
        }),
      })
        .then(async ({data}) => {
          await dispatch(getAllReviews(id));
          dispatch({
            type: POST_MY_REVIEW,
            payload: data,
          });
        })
        .catch(function (error) {
          Alert.alert('You have reviewed this movie');
        });
    });
  };
};
