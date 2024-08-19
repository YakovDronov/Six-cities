import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, OffersTypes, State} from '../types/types.tsx';
import {AxiosInstance} from 'axios';
import {APIRoute} from '../const.ts';
import {setOffers} from './actions.ts';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/setOffers',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<OffersTypes[]>(APIRoute.offers);
    dispatch(setOffers(data));
  }
);
