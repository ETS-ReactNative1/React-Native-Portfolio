import {
  ADD_FAVORITE_ITEM,
  REMOVE_FAVORITE_ITEM,
} from '../action/favoriteAction';


const initialState = {
  favorites: [],
};

function favoriteReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_FAVORITE_ITEM:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case REMOVE_FAVORITE_ITEM:
      return {
        ...state,
        favorites: state.favorites.filter(
          movie => movie.id !== action.payload.id,
        ),
      };
    default:
      return state;
  }
}

export default favoriteReducer;
