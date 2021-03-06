import axios from 'axios';
import { BASE_URL, API_KEY } from '../../config';
import defaultLocation from '../../temp-data/defaultLocation';
import tempLocations from '../../temp-data/locations';
import tempForecast from '../../temp-data/forecast';
import tempCurrentWeather from '../../temp-data/currentWeather';

export const GET_LOCATIONS = 'GET_LOCATIONS';
export const SELECT_LOCATION = 'SELECT_LOCATION';
export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
export const SET_PATH = 'SET_PATH';
export const SET_THEME = 'SET_THEME';
export const SET_UNIT = 'SET_UNIT';
export const SET_ERROR = 'SET_ERROR';

export const getCurrentLocation = (lat, lon) => {
    return async (dispatch) => {
        try {
            const currentLocationResponse = await axios.get(
                `${BASE_URL}/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${lat},${lon}`
            );
            const currentLocation =
                currentLocationResponse && currentLocationResponse.data
                    ? currentLocationResponse.data
                    : [];
            const currentWeatherResponse = await axios.get(
                `${BASE_URL}/currentconditions/v1/${currentLocation.Key}?apikey=${API_KEY}`
            );
            const currentWeather =
                currentWeatherResponse && currentWeatherResponse.data
                    ? currentWeatherResponse.data
                    : {};
            const forecastResponse = await axios.get(
                `${BASE_URL}/forecasts/v1/daily/5day/${currentLocation.Key}?apikey=${API_KEY}`
            );
            const forecast =
                forecastResponse && forecastResponse.data
                    ? forecastResponse.data
                    : {};
            dispatch({
                type: SELECT_LOCATION,
                location: [currentLocation],
                currentWeather,
                forecast,
            });
            // dispatch({ type: SELECT_LOCATION, location: defaultLocation, currentWeather: tempCurrentWeather, forecast: tempForecast })
        } catch (error) {
            dispatch({ type: SET_ERROR, error: error.Message });
        }
    };
};

export const getLocations = (value) => {
    return async (dispatch) => {
        try {
            const locationsResponse = await axios.get(
                `${BASE_URL}/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${value}`
            );
            const locations =
                locationsResponse && locationsResponse.data
                    ? locationsResponse.data
                    : [];
            dispatch({ type: GET_LOCATIONS, locations });
            // dispatch({ type: GET_LOCATIONS, locations: tempLocations })
        } catch (error) {
            dispatch({ type: SET_ERROR, error: error.Message });
        }
    };
};

export const selectLocation = (location) => {
    return async (dispatch) => {
        try {
            const currentWeatherResponse = await axios.get(
                `${BASE_URL}/currentconditions/v1/${location[0].Key}?apikey=${API_KEY}`
            );
            const currentWeather =
                currentWeatherResponse && currentWeatherResponse.data
                    ? currentWeatherResponse.data
                    : {};
            const forecastResponse = await axios.get(
                `${BASE_URL}/forecasts/v1/daily/5day/${location[0].Key}?apikey=${API_KEY}`
            );
            const forecast =
                forecastResponse && forecastResponse.data
                    ? forecastResponse.data
                    : {};
            dispatch({
                type: SELECT_LOCATION,
                location,
                currentWeather,
                forecast,
            });
            // dispatch({ type: SELECT_LOCATION, location, currentWeather: tempCurrentWeather, forecast: tempForecast })
        } catch (error) {
            dispatch({ type: SET_ERROR, error: error.Message });
        }
    };
};

export const toggleFavorite = (location) => {
    return { type: TOGGLE_FAVORITE, location };
};

export const setPath = (path) => {
    return { type: SET_PATH, path };
};

export const setTheme = (theme) => {
    return { type: SET_THEME, theme };
};

export const setUnit = (unit) => {
    return { type: SET_UNIT, unit };
};

export const setError = (error) => {
    return { type: SET_ERROR, error };
};
