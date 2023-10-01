import { createSlice } from '@reduxjs/toolkit';

import { loginThunk, registrationThunk } from './auth-thunks';
import HttpError from '../../constants/http-error';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorageKey from '../../constants/async-storage-key';

interface AuthState {
  isLoggedIn: boolean;
  isLoading: boolean;
  isSucceed?: boolean;
  error?: {
    title: string;
    message: string;
  }
}

const initialState: AuthState = {
  isLoggedIn: false,
  isLoading: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    clearError(state) {
      delete state.error;
    },
    clearIsSucceed(state) {
      delete state.isSucceed;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(registrationThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registrationThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.isSucceed = true;
      })
      .addCase(registrationThunk.rejected, (state, action) => {
        state.isLoading = false;

        switch (action.error.code) {
          case HttpError.BAD_REQUEST:
            state.error = {
              title: 'Data Not Saved',
              message: 'This username or email is already registered in the system. Please try registering with a different username or email.'
            };

            return;

          default:
            state.error = {
              title: 'Data Not Saved',
              message: 'Something went wrong, and your registration did not complete. Please try again.'
            };

            return;
        }
      })

      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucceed = true;

        state.isLoggedIn = true;
        AsyncStorage.setItem(AsyncStorageKey.ACCESS_TOKEN, action.payload.accessToken);
        AsyncStorage.setItem(AsyncStorageKey.REFRESH_TOKEN, action.payload.refreshToken);
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false;

        switch (action.error.code) {
          case HttpError.BAD_REQUEST:
            state.error = {
              title: 'Credentials Error',
              message: 'The username or password is incorrect.'
            };

            return;

          default:
            state.error = {
              title: 'Unknown Error',
              message: 'Something went wrong, and your login did not complete. Please try again.'
            }

            return;
        }
      })
  }
});

export const authActions = authSlice.actions;

export default authSlice;
