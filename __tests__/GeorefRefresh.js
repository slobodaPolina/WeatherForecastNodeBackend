import React from 'react';
import renderer from 'react-test-renderer';

jest.mock('../src/cityAdder')

import { GeorefRefresh } from '../src/components/GeorefRefresh';


describe('Functionality tests', () => {
    it('Test with mock', () => {
        const fn = jest.fn()

        const component = renderer.create(
            <GeorefRefresh dispatch={fn}/>
        )

        component.root.findByType('button').props.onClick();
        // called once
        expect(fn.mock.calls.length).toBe(1)
        // dispatch is called with the result of addCityByGeolocation mock
        expect(fn.mock.calls[0][0]).toBe("OK")
    })

})

it('renders loading correctly', () => {
  const tree = renderer.create(
        <GeorefRefresh/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
