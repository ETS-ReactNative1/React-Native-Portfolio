import axios from 'axios';

export const GET_MOVIES = 'GET_MOVIES';
export const GET_MOVIES_DETAIL = 'GET_MOVIES_DETAIL';
export const ALL_MOVIES = 'ALL_MOVIES';

const ALL_MOVIE_API =
  'https://team-a.gabatch11.my.id/movie/getAll?page=1&limit=21';
const DETAIL_API = 'https://team-a.gabatch11.my.id/movie/detail/';
const LIST_GENRE_API =
  'https://team-a.gabatch11.my.id/movie/search?page=1&limit=21&genre=';

export const getAllMovies = () => {
  return async dispatch => {
    const res = await axios.get(ALL_MOVIE_API);
    if (res.data.data.docs) {
      dispatch({
        type: GET_MOVIES,
        payload: res.data.data.docs,
      });
    } else {
      console.log('Unable to fetch');
    }
  };
};

export const getAllMovieList = () => {
  return async dispatch => {
    const res = await axios.get(ALL_MOVIE_API);
    // console.log('res', res);
    if (res.data.data.docs) {
      dispatch({
        type: ALL_MOVIES,
        payload: res.data.data.docs,
      });
    } else {
      console.log('Unable to fetch');
    }
  };
};

export const getMovieDetails = id => {
  return async dispatch => {
    const res = await axios.get(DETAIL_API + id);
    console.log('detail', res.data.data);
    if (res.data.data) {
      dispatch({
        type: GET_MOVIES_DETAIL,
        payload: res.data.data,
      });
    } else {
      console.log('Unable to fetch');
    }
  };
};

export const getMovieByGenre = genre => {
  return async dispatch => {
    let res;
    if (genre === 'All') {
      res = await axios.get(ALL_MOVIE_API);
    } else {
      res = await axios.get(LIST_GENRE_API + genre);
    }
    if (res.data.data.docs) {
      dispatch({
        type: GET_MOVIES,
        payload: res.data.data.docs,
      });
    } else {
      console.log('Unable to fetch');
    }
  };
};
