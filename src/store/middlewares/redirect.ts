import reducers from '../reducers.ts';
import {Middleware, PayloadAction} from '@reduxjs/toolkit';
import {browserHistory} from '../../browser-history.ts';

type Reducer = ReturnType<typeof reducers>;

export const redirect: Middleware<unknown, Reducer> =
  () =>
    (next) =>
      (action: PayloadAction<string>) => {
        if (action.type === 'offers/redirectToRoute') {
          browserHistory.push(action.payload);
        }

        return next(action);
      };
