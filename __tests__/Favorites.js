import React from 'react';
import renderer from 'react-test-renderer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../src/reducers';
import Favorites from '../src/components/Favorites';

const unloadedStore = createStore(
    rootReducer,
    {
        favorites: [
            {
                name: 'City 1',
                loaded: false,
            },
            {
                name: 'City 2',
                loaded: false,
            }
        ],
    }
);

const emptyStore = createStore(
    rootReducer,
    {favorites: []}
);

const loadedStore = createStore(
    rootReducer,
    {
        favorites: [
            {
                clouds: {
                    all: 40
                },
                cod: 200,
                coord: {
                    lat: 51.51,
                    lon: -0.13
                },
                dt: 1573292996,
                id: 2643743,
                loaded: true,
                main: {
                    humidity: 93,
                    pressure: 1008,
                    pressureAtm: "1.01",
                    pressureMmHg: "756.00",
                    temp: "2.48",
                    temp_max: 277.59,
                    temp_min: 274.26
                },
                name: "London",
                rain: {},
                sys: {
                    country: "GB",
                    id: 1414,
                    sunrise: 1573283248,
                    sunset: 1573316474,
                    type: 1
                },
                timezone: 0,
                visibility: 5000,
                weather: [{
                    description: "haze",
                    icon: "50d",
                    id: 721,
                    main: "Haze"
                }],
                wind: {
                    speed: 1.5
                }
            },
            {
                clouds: {
                    all: 40
                },
                cod: 200,
                coord: {
                    lat: 51.51,
                    lon: -0.13
                },
                dt: 1573292996,
                id: 2643743,
                loaded: true,
                main: {
                    humidity: 93,
                    pressure: 1008,
                    pressureAtm: "1.01",
                    pressureMmHg: "756.00",
                    temp: "2.48",
                    temp_max: 277.59,
                    temp_min: 274.26
                },
                name: "Paris",
                rain: {},
                weather: [{
                    description: "haze",
                    icon: "50d",
                    id: 721,
                    main: "Haze"
                }],
                wind: {
                    speed: 1.5
                }
            }
        ],
    }
);


it('renders unloaded favorites correctly', () => {
  const tree = renderer.create(
        <Provider store={unloadedStore}>
            <Favorites/>
        </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});


it('renders empty favorites correctly', () => {
  const tree = renderer.create(
        <Provider store={emptyStore}>
            <Favorites/>
        </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders loaded favorites correctly', () => {
  const tree = renderer.create(
        <Provider store={loadedStore}>
            <Favorites/>
        </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
