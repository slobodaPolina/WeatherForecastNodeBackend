import React from 'react';
import renderer from 'react-test-renderer';
import Favorites from '../src/components/Favorites';

const unloadedFavorites = [
            {
                name: 'City 1',
                loaded: false,
            },
            {
                name: 'City 2',
                loaded: false,
            }
        ];

const emptyFavorites = [];

const loadedFavorites = [
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
        ];


it('renders unloaded favorites correctly', () => {
    const component = renderer.create(<Favorites/>);
    component.getInstance().setState({ favorites: unloadedFavorites });
    expect(component.toJSON()).toMatchSnapshot();
});


it('renders empty favorites with non valid city correctly', () => {
    const component = renderer.create(<Favorites/>);
    component.getInstance().setState({
        isCityValid: false,
        favorites: emptyFavorites
    });
    expect(component.toJSON()).toMatchSnapshot();
});

it('renders empty favorites with city correctly', () => {
    const component = renderer.create(<Favorites/>);
    component.getInstance().setState({
        city: 'London',
        favorites: emptyFavorites
    });
    expect(component.toJSON()).toMatchSnapshot();
});

it('renders loaded favorites correctly', () => {
    const component = renderer.create(<Favorites/>);
    component.getInstance().setState({ favorites: loadedFavorites });
    expect(component.toJSON()).toMatchSnapshot();
});
