import { createSlice } from '@reduxjs/toolkit';
import EncryptedStorage from 'react-native-encrypted-storage';

import { checkIsLoggedInThunk, loginThunk, logoutThunk, registrationThunk } from './auth-thunks';
import HttpError from '../../constants/http-error';
import EncryptedStorageKey from '../../constants/encrypted-storage-key';

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

        state.isLoggedIn = true;
        EncryptedStorage.setItem(EncryptedStorageKey.ACCESS_TOKEN, action.payload.accessToken);
        EncryptedStorage.setItem(EncryptedStorageKey.REFRESH_TOKEN, action.payload.refreshToken);
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

      .addCase(logoutThunk.pending, (state) => {
        state.isLoggedIn = false;
        EncryptedStorage.removeItem(EncryptedStorageKey.ACCESS_TOKEN);
        EncryptedStorage.removeItem(EncryptedStorageKey.REFRESH_TOKEN);
      })

      .addCase(checkIsLoggedInThunk.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload;
      })
  }
});

export const authActions = authSlice.actions;

export default authSlice;
