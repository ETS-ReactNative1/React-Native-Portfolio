import {GET_PROFILE} from '../action/registerAction'
const initialState = {
  data: {},
};

const loginReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case GET_PROFILE:
      return{
        ...state,
        data: payload
      }
    default:
      return state;
  }
};

export default loginReducer;
