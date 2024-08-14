import {createAction} from '@reduxjs/toolkit';
import {City, OffersTypes} from '../types/types.tsx';
import {store} from './index.ts';

export const changeActiveCity = createAction<City>('city/changeCity');
export const setOffers = createAction<OffersTypes[]>('offers/setOffers');

export type RootState = ReturnType<typeof store.getState>;

