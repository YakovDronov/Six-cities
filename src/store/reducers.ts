import {combineReducers} from '@reduxjs/toolkit';
import {offersiReducer} from './reducers/offersi-reducer.ts';
import {currentCityReducer} from './reducers/city-reducer.ts';
import {authorizationReducer} from './reducers/authorization-reducer.ts';

export default combineReducers({
  currentCity: currentCityReducer,
  offers: offersiReducer,
  authorizationReducer: authorizationReducer,
});
