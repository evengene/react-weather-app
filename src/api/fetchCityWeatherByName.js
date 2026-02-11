import axios from 'axios';

const API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const IMPERIAL = 'imperial';



export const fetchCityWeatherByName = async (cityName) => {
  if (!API_KEY) {
    throw new Error('Missing OpenWeatherMap API key. Check your .env configuration.');
  }

  const safeCity = encodeURIComponent(cityName?.trim() ?? '');
  const url = `${BASE_URL}/weather?q=${safeCity}&APPID=${API_KEY}&units=${IMPERIAL}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    // Preserve useful error info for the caller (thunk/UI)
    const status = error?.response?.status;
    const message =
      status === 404 ? 'City not found' :
      status === 401 ? 'Invalid API key' :
      status === 429 ? 'Rate limit exceeded' :
      'Network or server error';

    const err = new Error(message);
    err.cause = error;
    throw err;
  }
};
