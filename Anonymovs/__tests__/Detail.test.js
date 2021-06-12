import 'react-native';
import React from 'react';
import Detail from '../src/pages/HomeScreen/Detail';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import store from '../src/redux/store';
jest.useFakeTimers();

test('Detail SnapShoot', () => {
  const snap = renderer
    .create(
      <Provider store={store}>
        <Detail />
      </Provider>,
    )
    .toJSON();

  expect(snap).toMatchSnapshot();
});
it(`renders correctly`, () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <Detail />
      </Provider>,
    )
    .toJSON();
  expect(tree.children.length).toBe(1);
});
