import { createAsyncThunk } from '@reduxjs/toolkit';

import UserService from '../../services/user-service';

export const getCurrentUserThunk = createAsyncThunk(
  'user/me',
  async () => {
    const response = await UserService.getCurrentUser();

    return response.data;
  }
);
