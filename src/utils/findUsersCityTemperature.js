import { filterWeatherDataFromApi } from './filterWeatherDataFromApi';
import { fetchCityWeatherByName, fetchDefaultUserLocationByIp } from '../api';
import { updateLatestItem } from '../redux/actions';

const getUsersCityLocation = () => {
  return fetchDefaultUserLocationByIp()
    .then(
      (response) => {
        return { city: response.city, ip: response.ip };
      }
    )
}

export const findUsersCityTemperature = async () => {
  try {
    const cityData = await getUsersCityLocation();
    const cityWeather = await fetchCityWeatherByName(cityData.city);
    const city = filterWeatherDataFromApi(cityWeather);
    return await updateLatestItem(city);
  } catch (error) {
    console.log(error);
  }
};