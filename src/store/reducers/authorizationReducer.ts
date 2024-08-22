import {AuthorizationStatus} from '../../const.ts';
import {createReducer} from '@reduxjs/toolkit';
import {requireAuthorization, setOffersDataLoadingStatus} from '../actions.ts';

type initialState = {
  authorizationStatus: AuthorizationStatus;
  isOffersDataLoading: boolean;
}

const initialState: initialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  isOffersDataLoading: false,
};

export const authorizationReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    });
});
