import {call, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getProfileData = async () => {
  const token = await AsyncStorage.getItem('token');
  return axios({
    method: 'get',
    url: 'https://portraiture.gabatch11.my.id/user/one',
    headers: {Authorization: `bearer ${token}`},
  })
    .then(res => {
      console.log('a', res.data.result);
      return res.data.result;
    })
    .catch(function (error) {
      console.log(error);
    });
};

const getPackageItems = async () => {
  const token = await AsyncStorage.getItem('token');
  try {
    const res = await axios({
      method: 'get',
      url: 'https://portraiture.gabatch11.my.id/package',
      headers: {Authorization: `bearer ${token}`},
    });
    console.log(res.data.result);
    return res.data.result;
  } catch (error) {
    console.log(error);
  }
};

const getProjectItems = async () => {
  const token = await AsyncStorage.getItem('token');
  try {
    const res = await axios({
      method: 'get',
      url: 'https://portraiture.gabatch11.my.id/project/?page=0&limit=10',
      headers: {Authorization: `bearer ${token}`},
    });
    console.log(res.data.result);
    return res.data.result;
  } catch (error) {
    console.log(error);
  }
};

const getProjectDetail = async id => {
  const token = await AsyncStorage.getItem('token');
  try {
    const res = await axios({
      method: 'get',
      url: 'https://portraiture.gabatch11.my.id/project/one?id=' + id,
      headers: {Authorization: `bearer ${token}`},
    });
    console.log(res.data.result);
    return res.data.result;
  } catch (error) {
    console.log(error);
  }
};

const getProjectInvoice = async id => {
  try {
    const {data} = await axios.get(
      'https://portraiture.gabatch11.my.id/invoice?id_project=' + id,
    );
    console.log('invoice1', data);
    return data.result;
  } catch (err) {
    return console.log(err.message);
  }
};

const getSelectedPackage = async id => {
  const token = await AsyncStorage.getItem('token');
  try {
    const res = await axios({
      method: 'get',
      url: `https://portraiture.gabatch11.my.id/package/one?packageId=${id}`,
      headers: {Authorization: `bearer ${token}`},
    });
    console.log(res.data.result);
    return res.data.result;
  } catch (error) {
    console.log(error);
  }
};

//! Rundown add person
const getPersonRundown = async id => {
  const token = await AsyncStorage.getItem('token');
  try {
    const res = await axios({
      method: 'get',
      url: 'https://portraiture.gabatch11.my.id/rundown/one?id=' + id,
      headers: {Authorization: `bearer ${token}`},
    });
    console.log('rundown1', res.data.result);
    return res.data.result;
  } catch (error) {
    console.log(error);
  }
};

const getEventRundown = async id => {
  const token = await AsyncStorage.getItem('token');
  try {
    const res = await axios({
      method: 'get',
      url: 'https://portraiture.gabatch11.my.id/event/one?id=' + id,
      headers: {Authorization: `bearer ${token}`},
    });
    console.log('event', res.data.result);
    return res.data.result;
  } catch (error) {
    console.log(error);
  }
};

const getSearchPackage = async name => {
  const token = await AsyncStorage.getItem('token');
  try {
    const res = await axios({
      method: 'get',
      url: 'https://portraiture.gabatch11.my.id/package/search?name=' + name,
      headers: {Authorization: `bearer ${token}`},
    });
    console.log('search 1', res.data.result);
    return res.data.result;
  } catch (error) {
    console.log(error);
  }
};

const getPackageFilter = async itemCategory => {
  console.log('saga', itemCategory);
  const token = await AsyncStorage.getItem('token');
  try {
    const res = await axios({
      method: 'get',
      url:
        'https://portraiture.gabatch11.my.id/package/filter?category_1=' +
        itemCategory.photoSession +
        '&category_2=' +
        itemCategory.video +
        '&cateogry_3=' +
        itemCategory.prints +
        '&category_4=' +
        itemCategory.digitals +
        '&min=' +
        itemCategory.price1 +
        '&max=' +
        itemCategory.price2,
      headers: {Authorization: `bearer ${token}`},
    });
    console.log('filter1', res.data.result);
    return res.data.result;
  } catch (error) {
    console.log(error);
  }
};

const getSearchProject = async name => {
  const token = await AsyncStorage.getItem('token');
  try {
    const res = await axios({
      method: 'get',
      url: 'https://portraiture.gabatch11.my.id/project/search?title=' + name,
      headers: {Authorization: `bearer ${token}`},
    });
    console.log('search 1', res.data.result);
    return res.data.result;
  } catch (error) {
    console.log(error);
  }
};

const getFilterProject = async id => {
  const token = await AsyncStorage.getItem('token');
  try {
    const res = await axios({
      method: 'get',
      url:
        'https://portraiture.gabatch11.my.id/project/filter?isCompleted=0' + id,
      headers: {Authorization: `bearer ${token}`},
    });
    console.log('filter 1', res.data.result);
    return res.data.result;
  } catch (error) {
    console.log(error);
  }
};

const getCollection = async () => {
  const token = await AsyncStorage.getItem('token');
  try {
    const res = await axios({
      method: 'get',
      url: 'https://portraiture.gabatch11.my.id/collection/all',
      headers: {Authorization: `bearer ${token}`},
    });
    console.log('col 1', res.data.result);
    return res.data.result;
  } catch (error) {
    console.log(error);
  }
};

const delCollection = async id => {
  const token = await AsyncStorage.getItem('token');
  try {
    const res = await axios({
      method: 'delete',
      url:
        'https://portraiture.gabatch11.my.id/collection/delete?id_collection=' +
        id,
      headers: {Authorization: `bearer ${token}`},
    });
    console.log('col 1', res.data.result);
    return res.data.result;
  } catch (error) {
    console.log(error);
  }
};

const getOneCollection = async id => {
  try {
    const res = await axios({
      method: 'get',
      url:
        'https://portraiture.gabatch11.my.id/collection/one?id_collection=' +
        id,
    });
    console.log('col 1', res.data.result);
    return res.data.result;
  } catch (error) {
    console.log(error);
  }
};

const getSearchCollection = async name => {
  const token = await AsyncStorage.getItem('token');
  try {
    const res = await axios({
      method: 'get',
      url:
        'https://portraiture.gabatch11.my.id/collection/search?title=' + name,
      headers: {Authorization: `bearer ${token}`},
    });
    console.log('col se 1', res.data.result);
    return res.data.result;
  } catch (error) {
    console.log(error);
  }
};

const getFilterCollection = async filter => {
  console.log(filter);
  const token = await AsyncStorage.getItem('token');
  try {
    const res = await axios({
      method: 'get',
      url:
        'https://portraiture.gabatch11.my.id/collection/filter?theme1=' +
        filter.classic +
        '&theme2=' +
        filter.minim +
        '&theme3=' +
        filter.dark +
        '&private=' +
        filter.privateC +
        '&public=' +
        filter.publicC,
      headers: {Authorization: `bearer ${token}`},
    });
    console.log('filter 1', res.data.result);
    return res.data.result;
  } catch (error) {
    console.log(error);
  }
};
//* FETCH DATA

function* fetchGetProfile() {
  const profile = yield call(getProfileData);
  console.log('GET PROFILE', profile);
  yield put({
    type: 'SET_PROFILE_DATA',
    payload: profile,
  });
}

function* fetchGetPackage() {
  const packageItems = yield call(getPackageItems);
  yield put({
    type: 'SET_PACKAGE',
    payload: packageItems,
  });
}

function* fetchGetProject() {
  const projectItem = yield call(getProjectItems);
  console.log('GET project', projectItem);
  yield put({
    type: 'SET_PROJECT',
    payload: projectItem,
  });
}

function* fetchGetDetailProject(action) {
  const projectDetail = yield call(getProjectDetail, action.payload);
  console.log('projectDetail', projectDetail);
  yield put({
    type: 'SET_PROJECT_DETAIL',
    payload: projectDetail,
  });
}

function* fetchGetInvoice(action) {
  const getInvoice = yield call(getProjectInvoice, action.payload);
  console.log('get Invoice', getInvoice);
  yield put({
    type: 'SET_INVOICE',
    payload: [...getInvoice, {add_id: 999, name: '+ Add New Invoice'}],
  });
}

function* fetchGetSelectedPackage(action) {
  const selectedPackage = yield call(getSelectedPackage, action.payload);
  // console.log('asda', selectedPackage);
  yield put({
    type: 'SET_SELECTED_PACKAGE',
    payload: selectedPackage,
  });
}

function* fetchGetPersonRundown(action) {
  const addPerson = yield call(getPersonRundown, action.payload);
  console.log('rundown2', addPerson);
  yield put({
    type: 'SET_PERSON',
    payload: [...addPerson, {id_rundown: 999, person: '+ Add Person'}],
  });
}

function* fetchGetEventRundown(action) {
  const addEvent = yield call(getEventRundown, action.payload);
  console.log('av', addEvent);
  yield put({
    type: 'SET_EVENT',
    payload: addEvent,
  });
}

function* fetchCollectionMock(action) {
  yield put({
    type: 'SET_COLLECTION_MOCK',
    payload: action.payload,
  });
}

function* fetchSearchPackage(action) {
  const searchPackage = yield call(getSearchPackage, action.payload);
  console.log('search2', searchPackage);
  yield put({
    type: 'SET_PACKAGE',
    payload: searchPackage,
  });
}

function* getCategoryId(action) {
  yield put({
    type: 'SET_CATEGORY_ID',
    payload: action.payload,
  });
}

function* fetchPackageFilter(action) {
  const packageFilter = yield call(getPackageFilter, action.payload);
  console.log('filter2', packageFilter);
  yield put({
    type: 'SET_PACKAGE',
    payload: packageFilter,
  });
}

function* fetchSearchProject(action) {
  const searchProject = yield call(getSearchProject, action.payload);
  console.log('search2', searchProject);
  yield put({
    type: 'SET_PROJECT',
    payload: searchProject,
  });
}

function* fetchFilterProject(action) {
  const filterProject = yield call(getFilterProject, action.payload);
  console.log('filter2', filterProject);
  yield put({
    type: 'SET_PROJECT',
    payload: filterProject,
  });
}

function* fetchCollection() {
  const collection = yield call(getCollection);
  console.log('col 2', collection);
  yield put({
    type: 'ADD_COLLECTION',
    payload: collection,
  });
}

function* fetchDeleteCollection(action) {
  const deleteCollection = yield call(delCollection, action.payload);
  console.log('coldel 2', deleteCollection);
}

function* fetchOneCollection(action) {
  const oneCollection = yield call(getOneCollection, action.payload);
  console.log('col 2', oneCollection);
  yield put({
    type: 'ADD_ONE_COLLECTION',
    payload: oneCollection,
  });
}

function* fetchSearchCollection(action) {
  const searchCollection = yield call(getSearchCollection, action.payload);
  console.log('col se 2', searchCollection);
  yield put({
    type: 'ADD_COLLECTION',
    payload: searchCollection,
  });
}

function* fetchFilterCollection(action) {
  const filterCollection = yield call(getFilterCollection, action.payload);
  console.log('filter 2', filterCollection);
  yield put({
    type: 'ADD_COLLECTION',
    payload: filterCollection,
  });
}

function* rootSagas() {
  yield takeLatest('REQUEST_PROFILE_DATA', fetchGetProfile);
  yield takeLatest('REQUEST_PROJECT_ITEMS', fetchGetProject);
  yield takeLatest('REQUEST_PACKAGE_ITEMS', fetchGetPackage);
  yield takeLatest('REQUEST_PROJECT_DETAIL_ID', fetchGetDetailProject);
  yield takeLatest('REQUEST_SELECT_PACKAGE', fetchGetSelectedPackage);
  yield takeLatest('REQUEST_PERSON_RUNDOWN', fetchGetPersonRundown);
  yield takeLatest('REQUEST_EVENT_RUNDOWN', fetchGetEventRundown);
  yield takeLatest('REQUEST_COLLECTION_MOCK', fetchCollectionMock);
  yield takeLatest('REQUEST_INVOICE', fetchGetInvoice);
  yield takeLatest('REQUEST_SEARCH_PACKAGE', fetchSearchPackage);
  yield takeLatest('REQUEST_CATEGORY_ID', getCategoryId);
  yield takeLatest('REQUEST_FILTER_PACKAGE', fetchPackageFilter);
  yield takeLatest('REQUEST_SEARCH_PROJECT', fetchSearchProject);
  yield takeLatest('REQUEST_FILTER_PROJECT', fetchFilterProject);
  yield takeLatest('REQUEST_ALL_COLLECTION', fetchCollection);
  yield takeLatest('DELETE_COLLECTION', fetchDeleteCollection);
  yield takeLatest('REQUEST_ONE_COLLECTION', fetchOneCollection);
  yield takeLatest('REQUEST_SEARCH_COLLECTION', fetchSearchCollection);
  yield takeLatest('REQUEST_FILTER_COLLECTION', fetchFilterCollection);
}

export default rootSagas;
