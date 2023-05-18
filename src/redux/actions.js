import { createAction } from 'redux-actions';

const changeCityName = createAction('CHANGE_CITY_NAME');
const addCity = createAction('ADD_CITY');
const clearItem = createAction('CLEAR_ITEM');
const updateLatestItem = createAction('UPDATE_LATEST_ITEM');

export { changeCityName, addCity, clearItem, updateLatestItem };