import { combineReducers } from 'redux';
import favorites from './favorites';
import geolocation from './geolocation';

export default combineReducers({
    favorites,
    geolocation
});
