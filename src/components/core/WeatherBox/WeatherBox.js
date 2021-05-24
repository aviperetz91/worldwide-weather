import './WeatherBox.css';
import React from 'react';
import moment from 'moment';
import weatherIcons from '../../../constants/weatherIcons';
import { useDispatch, useSelector } from 'react-redux';
import { setPath, selectLocation, getCurrentWeather, getForecast } from '../../../store/actions/mainActions';

const WeatherBox = props => {

    const { forecast, favorite, history } = props;
    const { theme } = useSelector(state => state.main);
    const dispatch = useDispatch();

    const handleFavoriteClick = () => {
        dispatch(selectLocation([{ Key: favorite.id, LocalizedName: favorite.name, Country: favorite.Country }]))
        dispatch(getCurrentWeather(favorite.id));
        dispatch(getForecast(favorite.id));
        dispatch(setPath("/"))
        history.push("/")
    }

    const styles = {
        'dark': {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white'
        },
        'light': {
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            color: 'black'
        }
    }

    if (forecast) {
        const fullDate = new Date(forecast.Date);
        const dayString = moment(fullDate).format('dddd');
        return (
            <div>
                <div className="day-text-container" style={styles[theme]}>
                    <h5 className="day-text">{dayString}</h5>
                </div>
                <div className="temperature-row">
                    <div className="temperature-cube" style={styles[theme]}>
                        <div className="temperature-text">{forecast.Temperature.Maximum.Value}</div>
                        <div>&#x2109;</div>
                    </div>
                    <div className="temperature-cube" style={styles[theme]}>
                        <div className="temperature-text">{forecast.Temperature.Minimum.Value}</div>
                        <div>&#x2109;</div>
                    </div>
                </div>
                <div className="weather-icon-container" style={styles[theme]}>
                    <img src={weatherIcons[forecast.Day.Icon]} width="120px" />
                    <div className="weather-icon-text">{forecast.Day.IconPhrase}</div>
                </div>
            </div>
        )
    } else if (favorite) {
        return (
            <div className="box-container" onClick={handleFavoriteClick}>
                <div className="day-text-container m-0" style={styles[theme]}>
                    <h5 className="day-text">{favorite.name}</h5>
                </div>
                <div className="temperature-rect m-0" style={styles[theme]}>
                    <div className="temperature-text">{favorite.currentWeather[0].Temperature.Imperial.Value}</div>
                    <div className="temperature-text">&#x2109;</div>
                </div>
                <div className="weather-icon-container" style={styles[theme]}>
                    <img src={weatherIcons[favorite.currentWeather[0].WeatherIcon]} width="120px" />
                    <div className="weather-icon-text">{favorite.currentWeather[0].WeatherText}</div>
                </div>
            </div>
        )
    }
}

export default WeatherBox;