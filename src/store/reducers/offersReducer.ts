import {createReducer} from '@reduxjs/toolkit';
import {OffersTypes} from '../../types/types.tsx';
import {Offers} from '../../mock/offers.ts';
import {setOffers} from '../actions.ts';

type initialState = {
  offers: OffersTypes[];
}

const initialState: initialState = {
  offers: Offers
};

export const offersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    });
});
