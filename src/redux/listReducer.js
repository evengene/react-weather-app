import * as actions from '../redux/actions';
import { handleActions } from 'redux-actions';

const STORAGE_KEY = 'citiesMine';

const loadCitiesFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
};

const persistedList = loadCitiesFromStorage();

const initialState = {
  list: persistedList,
  latestItem: persistedList.length ? persistedList[persistedList.length - 1] : '',
};

const upsertCityInList = (cities, city) => {
  const idx = cities.findIndex((c) => c.id === city.id);
  if (idx === -1) return [...cities, city];

  const copy = [...cities];
  copy[idx] = city;
  return copy;
  };

const addCity = (state, action) => {
  const city = action.payload;

  const updatedList = upsertCityInList(state.list, city);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));

  return {
    ...state,
    list: updatedList,
    latestItem: city,
  };
};

const updateLatestItem = (state, action) => {
  return {
    ...state,
    latestItem: action.payload,
  };
};

const clearItem = (state, action) => {
  const selectedCityId = action.payload;
  const newList = state.list.filter(city => city.id !== selectedCityId);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));

  const isClearingLatest = state.latestItem?.id === selectedCityId;
  const newLatestItem = isClearingLatest ? (newList.length ? newList[newList.length - 1] : '') : state.latestItem;

  return {
    ...state,
    list: newList,
    latestItem: newLatestItem,
  };
};

export default handleActions(
  {
    [actions.addCity]: addCity,
    [actions.clearItem]: clearItem,
    [actions.updateLatestItem]: updateLatestItem,
  },
  initialState,
);
