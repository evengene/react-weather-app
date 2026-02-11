import { filterWeatherDataFromApi } from './filterWeatherDataFromApi';
import { fetchCityWeatherByName, fetchDefaultUserLocationByIp } from '../api';
import { updateLatestItem } from '../redux/actions';

const getUsersCityLocation = async () => {
  const response = await fetchDefaultUserLocationByIp();
  return { city: response.city, ip: response.ip };
}

export const findUsersCityTemperature = () => {
  return async function (dispatch) {
    try {
      const cityData = await getUsersCityLocation();
      const cityWeather = await fetchCityWeatherByName(cityData.city);
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