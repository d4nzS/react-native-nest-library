import { createAsyncThunk } from '@reduxjs/toolkit';

export const registration = createAsyncThunk(
  'auth/registration',
  async () => {
    return null;
  }
);
