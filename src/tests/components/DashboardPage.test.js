import React from 'react';
import { shallow } from 'enzyme';
import { Dashboard } from './../../components/DashboardPage';
import trips from './../fixtures/trips';

let wrapper;

beforeEach(() => {
  wrapper = shallow(<Dashboard />);
});

test('it should render Dashboard correctly', () => {
  expect(wrapper).toMatchSnapshot();
});
