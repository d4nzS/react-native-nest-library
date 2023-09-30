import { configureStore } from '@reduxjs/toolkit';

import authSlice from './auth/auth-slice';
import bookSlice from './book/book-slice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    book: bookSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
