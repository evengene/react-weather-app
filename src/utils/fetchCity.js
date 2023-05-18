import { addCity } from '../redux/actions';
import { fetchCityWeatherByName } from '../api';
import { filterWeatherDataFromApi } from './filterWeatherDataFromApi';

export const fetchCity = (cityName) => {
  return function (dispatch) {
    fetchCityWeatherByName(cityName)
      .then(filterWeatherDataFromApi)
      .then(addCity)
      .then(dispatch)
  }
};
