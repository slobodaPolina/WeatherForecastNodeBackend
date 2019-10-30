import React from 'react';
import renderer from 'react-test-renderer';
import SmallPreview from '../src/components/SmallPreview';

const city = {
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
}

const unloadedCity = {
    name: 'London',
    loaded: false
}

it('renders SmallPreview correctly', () => {
    const tree = renderer.create(
        <SmallPreview city={city} removeCity={() => {}}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders SmallPreview of not loaded city correctly', () => {
    const tree = renderer.create(
        <SmallPreview city={unloadedCity} removeCity={() => {}}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
