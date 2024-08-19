import {configureStore} from '@reduxjs/toolkit';
import reducer from './reducers.ts';

export const store = configureStore({reducer});
