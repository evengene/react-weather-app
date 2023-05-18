import axios from 'axios';

const API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const IMPERIAL = 'imperial';



export const fetchCityWeatherByName = (cityName) => {
  const url = `${BASE_URL}/weather?q=${cityName}&APPID=${API_KEY}&units=${IMPERIAL}`;
  return axios.get(url).then((response) => {
    return response.data;
  })
    .catch((error) => {
      console.log(error);
    })
}
