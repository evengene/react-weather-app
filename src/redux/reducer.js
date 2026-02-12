import listReducer from './listReducer';
import searchReducer from './searchReducer';
import unitsReducer from "./unitsReducer";

import { combineReducers } from 'redux';

export default combineReducers({
  cities: listReducer,
  cityName: searchReducer,
  units: unitsReducer
})