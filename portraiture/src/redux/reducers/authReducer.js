const initialState = {
  profile: [],
};

const authReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case 'SET_PROFILE_DATA':
      return {
        ...state,
        profile: payload,
      };
    default:
      return state;
  }
};

export default authReducer;
