import {call, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';

const getAllMovies = async () => {
  try {
    const res = await axios({
      method: 'get',
      url: 'https://api.themoviedb.org/3/movie/now_playing?api_key=184906d1f379043dc33bceb2785a5fa2&language=en-US&page=1',
    });
    return res.data.results;
  } catch (error) {
    console.log(error);
  }
};

const getTopRated = async () => {
  try {
    const res = await axios({
      method: 'get',
      url: 'https://api.themoviedb.org/3/movie/top_rated?api_key=184906d1f379043dc33bceb2785a5fa2&language=en-US&page=1',
    });
    return res.data.results;
  } catch (error) {
    console.log(error);
  }
};

const getUpcoming = async () => {
  try {
    const res = await axios({
      method: 'get',
      url: 'https://api.themoviedb.org/3/movie/upcoming?api_key=184906d1f379043dc33bceb2785a5fa2&language=en-US&page=1',
    });
    return res.data.results;
  } catch (error) {
    console.log(error);
  }
};

const getDetail = async (id) => {
  try {
    const res = await axios({
      method: 'get',
      url: 'https://api.themoviedb.org/3/movie/'+id+'?api_key=184906d1f379043dc33bceb2785a5fa2&language=en-US',
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const getVideoDetail = async (id) => {
  try {
    const res = await axios({
      method: 'get',
      url: 'https://api.themoviedb.org/3/movie/'+id+'/videos?api_key=184906d1f379043dc33bceb2785a5fa2&language=en-US',
    });
    return res.data.results;
  } catch (error) {
    console.log(error);
  }
};

const getDetailReview = async (id) => {
  try {
    const res = await axios({
      method: 'get',
      url: 'https://api.themoviedb.org/3/movie/'+id+'/reviews?api_key=184906d1f379043dc33bceb2785a5fa2&language=en-US&page=1',
    });
    return res.data.results;
  } catch (error) {
    console.log(error);
  }
};

const getToken = async () => {
  try {
    const res = await axios({
      method: 'get',
      url: 'https://api.themoviedb.org/3/authentication/token/new?api_key=184906d1f379043dc33bceb2785a5fa2',
    });
    console.log('get token 1', res.data.request_token);
    return res.data.request_token;
  } catch (error) {
    console.log(error);
  }
};

//* FETCH DATA

export function* fetchAllMovies() {
  const movies = yield call(getAllMovies);
  yield put({
    type: 'SET_ALL_MOVIES',
    payload: movies,
  });
}
function* fetchTopRated() {
  const topRated = yield call(getTopRated);
  yield put({
    type: 'SET_ALL_MOVIES',
    payload: topRated,
  });
}

function* fetchUpcoming() {
  const upcoming = yield call(getUpcoming);
  yield put({
    type: 'SET_ALL_MOVIES',
    payload: upcoming,
  });
}

function* fetchDetail(action) {
  const detail = yield call(getDetail,action.payload);
  yield put({
    type: 'SET_DETAIL',
    payload: detail,
  });
}

function* fetchVideoDetail(action) {
  const video = yield call(getVideoDetail,action.payload);
  yield put({
    type: 'SET_VIDEO_DETAIL',
    payload: video,
  });
}

function* fetchGetReview(action) {
  const review = yield call(getDetailReview,action.payload);
  console.log('get review 2', review);
  yield put({
    type: 'SET_DETAIL_REVIEW',
    payload: review,
  });
}

function* getRandomName(action) {
  yield put({
    type: 'SET_RANDOM_NAME',
    payload: action.payload,
  });
}

function* postRating(action) {
  yield put({
    type: 'SET_RATING',
    payload: action.payload,
  });
}

function* fetchGetToken() {
  const token = yield call(getToken);
  yield put({
    type: 'SET_TOKEN',
    payload: token,
  });
}

function* addFavorites(action) {
  yield put({
    type: 'ADD_FAVORITE_ITEM',
    payload: action.payload,
  });
}

function* removeFavorites(action) {
  yield put({
    type: 'REMOVE_FAVORITE_ITEM',
    payload: action.payload,
  });
}

function* rootSagas() {
  yield takeLatest('REQUEST_LOGIN_NAME', getRandomName);
  yield takeLatest('REQUEST_ALL_MOVIES', fetchAllMovies);
  yield takeLatest('REQUEST_TOP_RATED', fetchTopRated);
  yield takeLatest('REQUEST_UPCOMING', fetchUpcoming);
  yield takeLatest('REQUEST_DETAIL', fetchDetail);
  yield takeLatest('REQUEST_VIDEO_DETAIL', fetchVideoDetail);
  yield takeLatest('REQUEST_REVIEW', fetchGetReview);
  yield takeLatest('REQUEST_TOKEN', fetchGetToken);
  yield takeLatest('REQUEST_RATING', postRating);
  yield takeLatest('REQUEST_ADD_FAVORITES', addFavorites);
  yield takeLatest('REQUEST_REMOVE_FAVORITES', removeFavorites);

}

export default rootSagas;