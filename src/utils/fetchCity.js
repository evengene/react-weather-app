import { addCity } from '../redux/actions';
import { fetchCityWeatherByName } from '../api';
import { filterWeatherDataFromApi } from './filterWeatherDataFromApi';

export const fetchCity = (cityName) => {
  return async function (dispatch) {
    try {
      const response = await fetchCityWeatherByName(cityName);
      const city = filterWeatherDataFromApi(response);

      if (!city) {
        throw new Error('Unexpected weather data shape');
      }

      dispatch(addCity(city));
      return city;
    } catch (error) {
      console.error(`Fetch error: ${error.message}`);
      throw error;
    }
  };
};