import axios from 'axios';
import getCityCodeByName from './vocabulary/vocabulary';

export function addCityByName(
    cityName,
    actionType,
    successCallback = () => {},
    failureCallback = () => {}
) {
    return (dispatch) => {
        var cityCode = getCityCodeByName(cityName);
        if (cityCode) {
            /*var city = {"coord":{"lon":145.77,"lat":-16.92},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03n"}],"base":"stations","main":{"temp":300.15,"pressure":1007,"humidity":74,"temp_min":300.15,"temp_max":300.15},"visibility":10000,"wind":{"speed":3.6,"deg":160},"clouds":{"all":40},"dt":1485790200,"sys":{"type":1,"id":8166,"message":0.2064,"country":"AU","sunrise":1485720272,"sunset":1485766550},"id":2172797,"name":"London","cod":200};
            successCallback();
            dispatch({
                type: actionType,
                city: preprocessData(city)
            });*/
            axios.get('https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?id=' + cityCode + '&appid=c21880c5125c247d642c0e4058a0a704')
                .then(({ data }) => {
                    successCallback();
                    dispatch({
                        type: actionType,
                        city: preprocessData(data)
                    });
                }).catch(error => {
                    failureCallback();
                });
        } else {
            failureCallback();
        }
    }
}

export function addCityByGeolocation() {
    return (dispatch) => {
        var addDefaultCity = () =>
            dispatch(
                addCityByName(
                    "Sankt-Peterburg", //this is the default value
                    'SET_GEOLOCATION'
                )
            );

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

function addCityByCoords(lat, lon, dispatch) {
    /*var city = {"coord":{"lon":145.77,"lat":-16.92},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03n"}],"base":"stations","main":{"temp":300.15,"pressure":1007,"humidity":74,"temp_min":300.15,"temp_max":300.15},"visibility":10000,"wind":{"speed":3.6,"deg":160},"clouds":{"all":40},"dt":1485790200,"sys":{"type":1,"id":8166,"message":0.2064,"country":"AU","sunrise":1485720272,"sunset":1485766550},"id":2172797,"name":"London","cod":200};
    dispatch({
        type: 'SET_GEOLOCATION',
        city: preprocessData(city)
    });*/
    axios.get('https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=c21880c5125c247d642c0e4058a0a704')
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

export default {addCityByName, addCityByGeolocation};
