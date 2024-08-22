import {createAction} from '@reduxjs/toolkit';
import {AppDispatch, City, OffersTypes, State} from '../types/types.tsx';
import {store} from './index.ts';
import {AppRoute, AuthorizationStatus} from '../const.ts';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

export const changeActiveCity = createAction<City>('city/changeCity');
export const setOffers = createAction<OffersTypes[]>('offers/setOffers');
export const requireAuthorization = createAction<AuthorizationStatus>('user/requreAuthorization');
export const setOffersDataLoadingStatus = createAction<boolean>('offers/setOffersDataLoadingStatus');
export const redirectToRoute = createAction<AppRoute>('offers/redirectToRoute');

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;

export type RootState = ReturnType<typeof store.getState>;

