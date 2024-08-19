import {createAction} from '@reduxjs/toolkit';
import {City, OffersTypes} from '../types/types.tsx';
import {store} from './index.ts';
import {AuthorizationStatus} from '../const.ts';

export const changeActiveCity = createAction<City>('city/changeCity');
export const setOffers = createAction<OffersTypes[]>('offers/setOffers');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requreAuthorization');

export type RootState = ReturnType<typeof store.getState>;

