import {combineReducers} from '@reduxjs/toolkit';
import {offersReducer} from './offers/offers.ts';
import {currentCityReducer} from './city/city.ts';

export const reducers = combineReducers({
  currenrCity: currentCityReducer,
  offers: offersReducer,
});
