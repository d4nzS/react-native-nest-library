import { createSlice } from '@reduxjs/toolkit';

import { registrationThunk } from './auth-thunks';
import Errors from '../../constants/errors';

interface AuthState {
  isLoading: boolean;
  errorCode?: Errors;
}

const initialState: AuthState = {
  isLoading: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearErrorCode(state) {
      delete state.errorCode;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(registrationThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registrationThunk.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(registrationThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.errorCode = action.error.code === Errors.BAD_REQUEST
          ? Errors.BAD_REQUEST
          : Errors.UNKNOWN;
      })
  }
});

export const authActions = authSlice.actions;

export default authSlice;
