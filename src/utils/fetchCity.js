import { addCity } from '../redux/actions';
import { fetchCityWeatherByName } from '../api';
import { filterWeatherDataFromApi } from './filterWeatherDataFromApi';
import {IMPERIAL_UNITS} from "../constants";

export const fetchCity = (cityName) => {
  return async function (dispatch, getState) {
    try {
      const units = getState()?.units || IMPERIAL_UNITS;

      const response = await fetchCityWeatherByName(cityName, units);
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