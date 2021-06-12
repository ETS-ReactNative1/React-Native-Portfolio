const initialState = {
  mock: [],
  collection: [],
  oneCollection : []
};

const collectionReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case 'SET_COLLECTION_MOCK':
      return {
        ...state,
        mock: [payload,...state.mock],
      };
      case 'ADD_COLLECTION':
      return {
        ...state,
        collection: payload,
      };
      case 'ADD_ONE_COLLECTION':
      return {
        ...state,
        oneCollection: payload,
      };
    default:
      return state;
  }
};

export default collectionReducer;
