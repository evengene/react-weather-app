import listReducer from './listReducer';
import searchReducer from './searchReducer';
import { combineReducers } from 'redux';

export default combineReducers({
  cities: listReducer,
  cityName: searchReducer,
})