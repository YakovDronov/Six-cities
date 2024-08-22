import {createReducer} from '@reduxjs/toolkit';
import {OffersTypes} from '../../types/types.tsx';
import {setOffers} from '../actions.ts';

type initialState = {
  offers: OffersTypes[];
}

const initialState: initialState = {
  offers: []
};

export const offersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    });
});
