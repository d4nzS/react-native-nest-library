import { configureStore } from '@reduxjs/toolkit';

import authSlice from './auth/auth-slice';
import bookSlice from './book/book-slice';
import userSlice from './user/user-slice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    book: bookSlice.reducer,
    user: userSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
