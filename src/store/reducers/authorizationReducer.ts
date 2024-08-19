import {AuthorizationStatus} from '../../const.ts';
import {createReducer} from '@reduxjs/toolkit';
import {requireAuthorization} from '../actions.ts';

type initialState = {
  requireAuthorization: AuthorizationStatus;
}

const initialState: initialState = {
  requireAuthorization: AuthorizationStatus.Unknown,
};

export const authorizationReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.requireAuthorization = action.payload;
    });
});
