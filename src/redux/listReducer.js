import * as actions from '../redux/actions';
import {handleActions} from 'redux-actions';

const initialState = {
  list: [],
  latestItem: '',
};

const addCity = (state, action) => {
  const city = action.payload;
  if (!isCityInList(state.list, city)) {
    const updatedCities = [...state.list, city];
    const latestItem = updatedCities.slice(-1)[0];
    return {
      list: updatedCities,
      latestItem: latestItem,
    }
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
