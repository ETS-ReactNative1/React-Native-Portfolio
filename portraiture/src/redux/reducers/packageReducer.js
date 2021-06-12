const initialState = {
  packageItems: [],
  selectedPackage: [],
  categoryId: '',
};

const packageReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case 'SET_PACKAGE':
      return {
        ...state,
        packageItems: payload,
      };
    case 'SET_SELECTED_PACKAGE':
      return {
        ...state,
        selectedPackage: payload,
      };
    case 'SET_SEARCH_PACKAGE':
      return {
        ...state,
        searchPackage: payload,
      };
      case 'SET_CATEGORY_ID':
      return {
        ...state,
        categoryId: payload,
      };
    default:
      return state;
  }
};

export default packageReducer;
