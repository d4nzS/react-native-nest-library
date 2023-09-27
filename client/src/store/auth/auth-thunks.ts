import { createAsyncThunk } from '@reduxjs/toolkit';

import RegistrationValues from '../../interfaces/registration-values';
import AuthService from '../../services/auth-service';

export const registrationThunk = createAsyncThunk(
  'auth/registration',
  async (registrationData: RegistrationValues) => {
    const response = await AuthService.registration(registrationData);

    return response.data;
  }
);
