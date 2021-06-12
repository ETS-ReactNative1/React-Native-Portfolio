import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import store from '../src/redux/store';

import Profile from '../src/pages/ProfileScreen/Profile';
import AboutApp from '../src/pages/ProfileScreen/AboutApp';
import AboutMe from '../src/pages/ProfileScreen/AboutMe';

jest.useFakeTimers();

test('Profile SnapShoot', () => {
  const snap = renderer
    .create(
      <Provider store={store}>
        <Profile />
      </Provider>,
    )
    .toJSON();
  expect(snap).toMatchSnapshot();
});
test('AboutApp SnapShoot', () => {
  const snap = renderer
    .create(
      <Provider store={store}>
        <AboutApp />
      </Provider>,
    )
    .toJSON();
  expect(snap).toMatchSnapshot();
});
test('AboutMe SnapShoot', () => {
  const snap = renderer
    .create(
      <Provider store={store}>
        <AboutMe />
      </Provider>,
    )
    .toJSON();
  expect(snap).toMatchSnapshot();
});
it(`renders correctly`, () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <Profile />
      </Provider>,
    )
    .toJSON();
  expect(tree.children.length).toBe(2);
});
it(`renders correctly`, () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <AboutApp />
      </Provider>,
    )
    .toJSON();
  expect(tree.children.length).toBe(1);
});
it(`renders correctly`, () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <AboutMe />
      </Provider>,
    )
    .toJSON();
  expect(tree.children.length).toBe(1);
});
