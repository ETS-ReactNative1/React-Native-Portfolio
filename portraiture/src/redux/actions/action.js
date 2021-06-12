export const fetchRequestProfileData = () => {
  return {
    type: 'REQUEST_PROFILE_DATA',
    payload: [],
  };
};

export const fetchRequestPackageItems = () => {
  return {
    type: 'REQUEST_PACKAGE_ITEMS',
    payload: [],
  };
};

export const fetchRequestProjectItems = () => {
  return {
    type: 'REQUEST_PROJECT_ITEMS',
    payload: [],
  };
};

export const projectDetailId = id => {
  return {
    type: 'REQUEST_PROJECT_DETAIL_ID',
    payload: id,
  };
};

export const fetchRequestInvoice = id => {
  return {
    type: 'REQUEST_INVOICE',
    payload: id,
  };
};

export const fetchSelectedPackage = id => {
  return {
    type: 'REQUEST_SELECT_PACKAGE',
    payload: id,
  };
};

export const fetchAddPersonRundown = id => {
  return {
    type: 'REQUEST_PERSON_RUNDOWN',
    payload: id,
  };
};

export const actionEventRundown = id => {
  return {
    type: 'REQUEST_EVENT_RUNDOWN',
    payload: id,
  };
};

export const collectionDetailsAction = addCollection => {
  return {
    type: 'REQUEST_COLLECTION_MOCK',
    payload: addCollection
  };
};

export const packageItemAction = packageItem => {
  return {
    type: 'REQUEST_PACKAGE_ITEM',
    payload: packageItem
  };
};

export const actionSearchPackage = name => {
  return {
    type: 'REQUEST_SEARCH_PACKAGE',
    payload: name
  };
};

export const actionCategoryId = id => {
  return {
    type: 'REQUEST_CATEGORY_ID',
    payload: id
  }
}

export const actionFilterPackage = itemCategory => {
  return{
    type: 'REQUEST_FILTER_PACKAGE',
    payload: itemCategory
  }
}

export const actionSearchProject = name => {
  return {
    type: 'REQUEST_SEARCH_PROJECT',
    payload: name
  };
};

export const actionFilterProject = id => {
  return {
    type: 'REQUEST_FILTER_PROJECT',
    payload: id
  };
};

export const actionGetAllCollection = () => {
  return {
    type: 'REQUEST_ALL_COLLECTION',
    payload: []
  };
};

export const actionDeleteCollection = id => {
  return {
    type: 'DELETE_COLLECTION',
    payload: id
  };
};

export const actionGetOneCollection = id => {
  return {
    type: 'REQUEST_ONE_COLLECTION',
    payload: id
  };
};

export const actionSearchCollection = name => {
  return {
    type: 'REQUEST_SEARCH_COLLECTION',
    payload: name
  };
};

export const actionFilterCollection = filter => {
  return {
    type: 'REQUEST_FILTER_COLLECTION',
    payload: filter
  };
};