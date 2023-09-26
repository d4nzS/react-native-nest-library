import { createSlice } from '@reduxjs/toolkit';
import { registration } from './auth-thunks';

interface AuthState {
  isLoading: boolean;
}

const initialState: AuthState = {
  isLoading: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      registration.fulfilled, () => {
      }
    )
  }
});

export default authSlice;
