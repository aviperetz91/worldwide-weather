import {
    GET_LOCATIONS,
    SELECT_LOCATION,
    TOGGLE_FAVORITE,
    SET_PATH,
    SET_THEME,
    SET_UNIT,
    SET_ERROR,
} from '../actions/mainActions';
import { FAHRENHEIT_VALUE, DARK_VALUE } from '../../constants/consts';

const initialState = {
    locations: [],
    selectedLocation: [],
    currentWeather: [],
    forecast: {},
    favorites: [],
    path: window.location.pathname,
    unit: FAHRENHEIT_VALUE,
    theme: DARK_VALUE,
    error: undefined,
};

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LOCATIONS:
            return {
                ...state,
                locations: action.locations,
            };
        case SELECT_LOCATION:
            return {
                ...state,
                selectedLocation: action.location,
                currentWeather: action.currentWeather,
                forecast: action.forecast,
            };
        case TOGGLE_FAVORITE:
            const updatedFavorites = toggleFavorite(
                state.favorites,
                action.location
            );
            return {
                ...state,
                favorites: updatedFavorites,
            };
        case SET_PATH:
            return {
                ...state,
                path: action.path,
            };
        case SET_THEME:
            return {
                ...state,
                theme: action.theme,
            };
        case SET_UNIT:
            return {
                ...state,
                unit: action.unit,
            };
        case SET_ERROR:
            return {
                ...state,
                error: action.error,
            };
        default:
            return state;
    }
};

const toggleFavorite = (favorites, newLocation) => {
    const isFavorite = favorites.some((fav) => fav.id === newLocation.id);
    let updatedFavorites = [];
    if (isFavorite) {
        updatedFavorites = favorites.filter((fav) => fav.id !== newLocation.id);
    } else {
        updatedFavorites = [...favorites, newLocation];
    }
    return updatedFavorites;
};

export default mainReducer;
