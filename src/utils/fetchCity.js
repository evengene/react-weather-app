import { addCity } from '../redux/actions';
import { fetchCityWeatherByName } from '../api';
import { filterWeatherDataFromApi } from './filterWeatherDataFromApi';

export const fetchCity = (cityName) => {
  return function (dispatch) {
    fetchCityWeatherByName(cityName)
      .then(
        (response) => {
          if (!response) {
            throw new Error('City not found');
          }
          return response;
        }
      )
      .then(filterWeatherDataFromApi)
      .then(addCity)
      .then(dispatch)
      .catch(handleError);
  }
};

const handleError = (error) => {
  console.error(`Fetch error: ${error.message}`);
}