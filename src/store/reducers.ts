import {combineReducers} from '@reduxjs/toolkit';
import {offersReducer} from './reducers/offersReducer.ts';
import {currentCityReducer} from './reducers/cityReducer.ts';

export default combineReducers({
  currentCity: currentCityReducer,
  offers: offersReducer,
});
