import axios from 'axios';
import getCityCodeByName from './vocabulary/vocabulary';

export function addCityByName(
    cityName,
    successCallback = () => {},
    failureCallback = () => {}
) {
    const cityCode = getCityCodeByName(cityName);
    if (cityCode) {
        axios.get('/weather?cityCode=' + cityCode)
            .then(({ data }) => successCallback(data))
            .catch(error => failureCallback(error));
    } else {
        failureCallback();
    }
}

export function addCityByGeolocation() {
    return (dispatch) => {
        const addDefaultCity = () => dispatch(setDefaultGeolocationCity());
        // setting loading
        dispatch({
            type: 'SET_GEOLOCATION',
            city: null
        });
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                position => addCityByCoords(
                    position.coords.latitude,
                    position.coords.longitude,
                    dispatch
                ),
                addDefaultCity
            );
        } else {
            addDefaultCity();
        }
    }
}

export function addCityToTheFavorites(cityName, successCallback, failureCallback) {
    axios.post('/favorites?name=' + cityName)//todo body, not query!
        .then(successCallback)
        .catch(failureCallback);
}

function setDefaultGeolocationCity() {
    return (dispatch) => {
        addCityByName(
            'Sankt-Peterburg',
            (data) => dispatch({
                type: 'SET_GEOLOCATION',
                city: preprocessData(data)
            })
        );
    }
}

function addCityByCoords(lat, lon, dispatch) {
    axios.get('/weather/coordinates?lat=' + lat + '&lon=' + lon)
        .then(({ data }) => {
            dispatch({
                type: 'SET_GEOLOCATION',
                city: preprocessData(data)
            });
        });
}

function preprocessData(data) {
    data.main.temp = (data.main.temp - 273.15).toFixed(1);
    data.main.pressureMmHg = (data.main.pressure * 0.75).toFixed(2);
    data.loaded = true;
    return data;
}

export default {addCityByName, addCityByGeolocation, addCityToTheFavorites};
