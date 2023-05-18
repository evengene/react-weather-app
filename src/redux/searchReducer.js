import * as actions from '../redux/actions';
import { handleActions } from 'redux-actions';

const initialState = '';

const changeCityName = (name, action) => action.payload.value;

const clearCityName = (name, action) => '';

export default handleActions({
    [actions.changeCityName]: changeCityName,
    [actions.addCity]: clearCityName
  },
  initialState
);