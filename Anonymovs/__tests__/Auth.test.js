import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import store from '../src/redux/store';

import Splash from '../src/pages/AuthScreen/Splash';
import Login from '../src/pages/AuthScreen/Login';

jest.useFakeTimers();

test('Profile SnapShoot', () => {
  const snap = renderer
    .create(
      <Provider store={store}>
        <Splash />
      </Provider>,
    )
    .toJSON();
  expect(snap).toMatchSnapshot();
});
test('AboutApp SnapShoot', () => {
  const snap = renderer
    .create(
      <Provider store={store}>
        <Login />
      </Provider>,
    )
    .toJSON();
  expect(snap).toMatchSnapshot();
});
it(`renders correctly`, () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <Splash />
      </Provider>,
    )
    .toJSON();
  expect(tree.children.length).toBe(2);
});
it(`renders correctly`, () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <Login />
      </Provider>,
    )
    .toJSON();
  expect(tree.children.length).toBe(2);
});
