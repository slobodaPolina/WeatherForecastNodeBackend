import React from 'react';
import renderer from 'react-test-renderer';
import Loading from '../src/components/Loading';

it('renders loading correctly', () => {
  const tree = renderer.create(<Loading/>).toJSON();
  expect(tree).toMatchSnapshot();
});
