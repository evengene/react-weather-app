import * as actions from '../redux/actions';
import { handleActions } from 'redux-actions';
import {IMPERIAL_UNITS} from "../constants";

const initialState = IMPERIAL_UNITS;

const setUnits = (state, action) => action.payload;

export default handleActions(
    {
        [actions.setUnits]: setUnits,
    },
    initialState,
);