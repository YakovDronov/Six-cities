import {configureStore} from '@reduxjs/toolkit';
import reducer from './reducers.ts';
import {createAPI} from '../services/api.ts';
import {redirect} from './middlewares/redirect.ts';
import 'react-toastify/dist/ReactToastify.css';

export const api = createAPI();

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});
