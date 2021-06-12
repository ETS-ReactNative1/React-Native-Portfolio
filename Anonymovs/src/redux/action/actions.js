export const actionLoginName = name => {
  return {
    type: 'REQUEST_LOGIN_NAME',
    payload: name,
  };
};

export const actionGetAllMovies = () => {
  return {
    type: 'REQUEST_ALL_MOVIES',
    payload: [],
  };
};

export const actionTopRated = () => {
  return {
    type: 'REQUEST_TOP_RATED',
    payload: [],
  };
};

export const actionUpcoming = () => {
  return {
    type: 'REQUEST_UPCOMING',
    payload: [],
  };
};

export const actionDetail = id => {
  return {
    type: 'REQUEST_DETAIL',
    payload: id,
  };
};

export const actionVideoDetail = id => {
  return {
    type: 'REQUEST_VIDEO_DETAIL',
    payload: id,
  };
};

export const actionReview = id => {
  return {
    type: 'REQUEST_REVIEW',
    payload: id,
  };
};

export const actionRatingSubmit = rating => {
  return {
    type: 'REQUEST_RATING',
    payload: rating,
  };
};

export const actionToken = () => {
  return {
    type: 'REQUEST_TOKEN',
    payload: ''
  }
}

export const addFavorite = movie => {
  return {
    type: 'REQUEST_ADD_FAVORITES',
    payload: movie,
  };
};

export const removeFavorite = movie => {
  return {
    type: 'REQUEST_REMOVE_FAVORITES',
    payload: movie,
  };
};