import axios from 'axios';

const tokenIpi = 'e1585ae177a8ff';
const baseUrlIpi = 'https://ipinfo.io/json?token=';


export const fetchDefaultUserLocationByIp = () => {
  return axios.get(`${baseUrlIpi}${tokenIpi}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    })
}