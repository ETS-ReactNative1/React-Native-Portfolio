const initialState = {
  name: '',
  movies: [],
  detail: {},
  video: {},
  review: [],
  token: '',
  rating: '',
  favorites:[]
};

const allReducers = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case 'SET_RANDOM_NAME':
      return {
        ...state,
        name: payload,
      };
    case 'SET_ALL_MOVIES':
      return {
        ...state,
        movies: payload,
      };
    case 'SET_DETAIL':
      return {
        ...state,
        detail: payload,
      };
    case 'SET_VIDEO_DETAIL':
      return {
        ...state,
        video: payload,
      };
    case 'SET_DETAIL_REVIEW':
      return {
        ...state,
        review: payload,
      };
    case 'SET_RATING':
      return {
        ...state,
        rating: payload,
      };
    case 'SET_TOKEN':
      return {
        ...state,
        token: payload,
      };
    case 'ADD_FAVORITE_ITEM':
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case 'REMOVE_FAVORITE_ITEM':
      return {
        ...state,
        favorites: state.favorites.filter(
          movie => movie.id !== action.payload.id,
        ),
      };
    default:
      return state;
  }
};

export default allReducers;
