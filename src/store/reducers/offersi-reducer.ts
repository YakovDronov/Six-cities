import {createReducer} from '@reduxjs/toolkit';
import {ShortOfferTypes} from '../../types/types.tsx';
import {setOffers} from '../actions.ts';

type initialState = {
  offers: ShortOfferTypes[];
}

const initialState: initialState = {
  offers: []
};

export const offersiReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    });
});
