import * as actions from '../redux/actions';
import { handleActions } from 'redux-actions';

const initialState = {
  list: [],
  latestItem: '',
};

const addCity = (state, action) => {
  const city = action.payload;
  const cityArray = getCities(state);
  if (!isCityInList(cityArray, city)) {
    const updatedList = [...cityArray, city];
    localStorage.setItem('citiesMine', JSON.stringify(updatedList));
    const updatedLatestItem = updatedList.slice(-1)[0];
    return {
      list: updatedList,
      latestItem: updatedLatestItem,
    }
  }
}

const getCities = (state) => {
  const cities = localStorage.getItem('citiesMine') || '';
  if (cities) {
    return JSON.parse(cities);
  } else {
    return state.list;
  }
}

const updateLatestItem = (state, action) => {
  return {
    ...state,
    latestItem: action.payload,
  };
}

const isCityInList = (cities, newCity) => {
  const existingCity = cities.find(city => city.id === newCity.id);
  return existingCity != null;
}

const clearItem = (state, action) => {
  const selectedCityId = action.payload;
  const newList = state.list.filter(city => city.id !== selectedCityId);
  localStorage.setItem('citiesMine', JSON.stringify(newList));
  const newLatestItem = state.latestItem.id === selectedCityId ? state.list.slice(-1)[0] : state.latestItem;
  return {
    list: newList,
    latestItem: newLatestItem,
  }
}

export default handleActions({
    [actions.addCity]: addCity,
    [actions.clearItem]: clearItem,
    [actions.updateLatestItem]: updateLatestItem,
  },
  initialState,
);
