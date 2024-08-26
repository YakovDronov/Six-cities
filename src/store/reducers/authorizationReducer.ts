import {AuthorizationStatus} from '../../const.ts';
import {createReducer} from '@reduxjs/toolkit';
import {requireAuthorization, setOffersDataLoadingStatus} from '../actions.ts';
import {UserData} from '../../types/types.tsx';

type initialState = {
  authorizationStatus: AuthorizationStatus;
  isOffersDataLoading: boolean;
  user: undefined | UserData;
}

const initialState: initialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  isOffersDataLoading: false,
  user: undefined,
};

export const authorizationReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload.authStatus;
      state.user = action.payload.userData;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    });
});
