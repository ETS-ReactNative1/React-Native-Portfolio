import {GET_GENRES, GENRE_TITLE} from '../action/genresAction';
import {
  GET_MOVIES,
  GET_MOVIES_DETAIL,
  SEARCH_MOVIES,
  ALL_MOVIES,
} from '../action/moviesAction';
const initialState = {
  movies: [],
  moviesDetail: {},
  cast: [],
  genres: [],
  loading: true,
  genreTitle: '',
  search: [],
  allMovies: [],
};

function moviesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MOVIES:
      return {
        ...state,
        movies: action.payload,
      };
    case GET_MOVIES_DETAIL:
      return {
        ...state,
        moviesDetail: action.payload,
      };
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    case GENRE_TITLE:
      return {
        ...state,
        genreTitle: action.payload,
      };
    case SEARCH_MOVIES:
      return {
        ...state,
        search: action.payload,
      };
    case ALL_MOVIES:
      return {
        ...state,
        allMovies: action.payload,
      };
    default:
      return state;
  }
}
export default moviesReducer;
