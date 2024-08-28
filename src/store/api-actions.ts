import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, AuthData, State, LoginData, UserData, ShortOfferTypes} from '../types/types.tsx';
import {AxiosInstance} from 'axios';
import {APIRoute, AppRoute, AuthorizationStatus} from '../const.ts';
import {redirectToRoute, requireAuthorization, setOffers} from './actions.ts';
import {deleteToken, saveToken} from '../services/token.ts';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/setOffers',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<ShortOfferTypes[]>(APIRoute.Offers);
    dispatch(setOffers(data));
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/chekAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<UserData>(APIRoute.Login);
      dispatch(requireAuthorization({userData: data, authStatus: AuthorizationStatus.Auth}));
    } catch {
      dispatch(requireAuthorization({userData: undefined, authStatus: AuthorizationStatus.NoAuth}));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<LoginData>(APIRoute.Login, {email, password});
    saveToken(token);
    const {data} = await api.get<UserData>(APIRoute.Login);
    dispatch(requireAuthorization({userData: data, authStatus: AuthorizationStatus.Auth}));
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    deleteToken();
    dispatch(requireAuthorization({userData: undefined, authStatus: AuthorizationStatus.NoAuth}));
  },
);
