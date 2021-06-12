import 'react-native';
import React from 'react';
import {FlatList} from 'react-native';
import Home from '../src/pages/HomeScreen/Home';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import store from '../src/redux/store';
import {render,waitForElement, fireEvent} from '@testing-library/react-native';
import axios from 'axios'
jest.useFakeTimers();

test('Home SnapShoot', () => {
  const snap = renderer
    .create(
      <Provider store={store}>
        <Home />
      </Provider>,
    )
    .toJSON();

  expect(snap).toMatchSnapshot();
});
it(`renders correctly`, () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <Home />
      </Provider>,
    )
    .toJSON();
  expect(tree.children.length).toBe(3);
});

const mockData = [
  {
    id: 'id-1',
    title: 'Title-1',
  },
  {
    id: 'id-2',
    title: 'Title-2',
  },
  {
    id: 'id-3',
    title: 'Title-3',
  },
];

describe('Testing FlatList', () => {
  test('Error component should be render when error is true', () => {
    const componentTree = render(
      <Provider store={store}>
        <Home data={mockData} />
      </Provider>,
    );

    expect(componentTree.UNSAFE_getAllByType(FlatList).length).toBe(2);
  });
});