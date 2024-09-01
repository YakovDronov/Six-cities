import {createReducer} from '@reduxjs/toolkit';
import {changeActiveCity} from '../actions.ts';
import {City} from '../../types/types.tsx';
import {CITIES} from '../../const.ts';

type initialState = {
  currentCity: City;
}

const initialState: initialState = {
  currentCity: CITIES[0]
};

export const currentCityReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeActiveCity, (state, action) => {
      state.currentCity = action.payload;
    });
});
