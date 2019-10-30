import React from 'react';
import renderer from 'react-test-renderer';
import WeatherImage from '../src/components/WeatherImage';

it('renders WeatherImage correctly', () => {
    const tree = renderer.create(
        <WeatherImage name="Clear"/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
