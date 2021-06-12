const initialState = {
  projectItems: [],
  projectDetail: [],
  invoice: [],
  person: [],
  event: [],
};

const projectReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case 'SET_PROJECT':
      return {
        ...state,
        projectItems: payload,
      };
    case 'SET_PROJECT_DETAIL':
      return {
        ...state,
        projectDetail: payload,
      };
    case 'SET_INVOICE':
      return {
        ...state,
        invoice: payload,
      };
    case 'SET_PERSON':
      return {
        ...state,
        person: payload,
      };
    case 'SET_EVENT':
      return {
        ...state,
        event: payload,
      };
    default:
      return state;
  }
};

export default projectReducer;
