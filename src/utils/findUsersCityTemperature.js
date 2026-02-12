import { filterWeatherDataFromApi } from './filterWeatherDataFromApi';
import { fetchCityWeatherByName, fetchDefaultUserLocationByIp } from '../api';
import { updateLatestItem } from '../redux/actions';
import {IMPERIAL_UNITS} from "../constants";

const getUsersCityLocation = async () => {
  const response = await fetchDefaultUserLocationByIp();
  return { city: response.city, ip: response.ip };
}

export const findUsersCityTemperature = () => {
  return async function (dispatch, getState) {
    try {
      const units = getState()?.units || IMPERIAL_UNITS;

      const cityData = await getUsersCityLocation();
      const cityWeather = await fetchCityWeatherByName(cityData.city, units);
      const city = filterWeatherDataFromApi(cityWeather);

      if (!city) {
        throw new Error('Unexpected weather data shape');
      }

      dispatch(updateLatestItem(city));
      return city;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
};