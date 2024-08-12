import {CITIES} from '../../../const.ts';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {City} from '../../../types/types.tsx';
import {RootState} from '../../reducer.ts';

const initialState = {
  currentCity: CITIES[0],
};

const currentCitySlice = createSlice({
  name: 'currentCity',
  initialState,
  reducers: {
    changeCity (state, action: PayloadAction<City>) {
      state.currentCity = action.payload;
    }
  }
});

const {actions, reducer} = currentCitySlice;

export const currentCity = (state: RootState): City => state.city.currentCity;

export const { changeCity } = actions;
export default reducer;
