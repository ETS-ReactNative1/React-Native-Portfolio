import axios from 'axios'

export const GET_GENRES = 'GET_GENRES';
export const GENRE_TITLE = 'GENRE_TITLE'

const GENRE_API = 'https://team-a.gabatch11.my.id/genre/getMain';

export const getGenres = () => {
  try {
    return async dispatch => {
      const res = await axios.get(GENRE_API);
      if (res.data.data) {
        dispatch({
          type: GET_GENRES,
          payload: [{deleted: false, _id: "60799c31c6d6a52103fd7001", isMain: true, genre: "All"},...res.data.data]
        });
      } else {
        console.log('Unable to fetch');
      }
    };
  } catch (error) {
    console.log(error);
  }
};

export const getTitleMovies = genre => {
  return{
    type: GENRE_TITLE,
    payload: genre,
  }
}