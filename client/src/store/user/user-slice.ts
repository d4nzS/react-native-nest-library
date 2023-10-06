import { createSlice } from '@reduxjs/toolkit';

import UserData from '../../interfaces/user-data';
import { getCurrentUserThunk } from './user-thunks';

interface UserState {
  currentUser?: UserData;
  isLoading: boolean;
}

const initialState: UserState = {
  isLoading: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getCurrentUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
      })
      .addCase(getCurrentUserThunk.rejected, (state, action) => {

      })
  }
});

export default userSlice;
