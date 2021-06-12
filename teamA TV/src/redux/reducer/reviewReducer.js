import {
  GET_MY_REVIEW,
  GET_MOVIE_BY_IDMOVIE,
  REMOVE_MY_REVIEW,
  EDIT_REVIEW,
  POST_MY_REVIEW,
} from '../action/reviewAction';

const initialState = {
  dataReview: [],
  myReview: [],
};

function reviewReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MOVIE_BY_IDMOVIE:
      return {
        ...state,
        dataReview: action.payload,
      };
    case GET_MY_REVIEW:
      return {
        ...state,
        myReview: action.payload,
      };
    case REMOVE_MY_REVIEW:
      return {
        ...state,
        myReview: state.myReview.filter(
          item => item._id !== action.payload._id,
        ),
      };
    case POST_MY_REVIEW:
      return {
        ...state,
        myReview: action.payload,
      };
    case EDIT_REVIEW:
      return {
        ...state,
        myReview: action.payload,
      };
    default:
      return state;
  }
}

export default reviewReducer;
