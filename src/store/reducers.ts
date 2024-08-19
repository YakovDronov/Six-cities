import {combineReducers} from '@reduxjs/toolkit';
import {offersReducer} from './reducers/offersReducer.ts';
import {currentCityReducer} from './reducers/cityReducer.ts';
import {authorizationReducer} from './reducers/authorizationReducer.ts';

export default combineReducers({
  currentCity: currentCityReducer,
  offers: offersReducer,
  authorizationReducer: authorizationReducer,
});
