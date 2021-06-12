import {runSaga} from 'redux-saga'
import {fetchAllMovies} from '../src/redux/saga/sagas'

test('should load movies',async()=>{
    const dispatchedAction = [];
    const fakeStore = {
        getState: () => ({ nextPage:1}),
        dispatch: action => dispatchedAction.push(action)
    }
    await runSaga(fakeStore, fetchAllMovies).done;
})