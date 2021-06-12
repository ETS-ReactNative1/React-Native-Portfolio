import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const GET_PROFILE = 'GET_PROFILE';

export const getProfileData = () => {
  return dispatch => {
    AsyncStorage.getItem('token', (err, userToken) => {
      axios({
        method: 'GET',
        url: 'https://team-a.gabatch11.my.id/user/myUserProfile',
        headers: {Authorization: `bearer ${userToken}`},
      })
        .then(({data}) => {
          dispatch({
            type: GET_PROFILE,
            payload: data.data,
          });
        })
        .catch(err => console.log(err.message));
    });
  };
};
