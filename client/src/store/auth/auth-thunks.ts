import { createAsyncThunk } from '@reduxjs/toolkit';

import RegistrationValues from '../../interfaces/registration-values';
import AuthService from '../../services/auth-service';
import LoginValues from '../../interfaces/login-values';

export const registrationThunk = createAsyncThunk(
  'auth/register',
  async (registrationData: RegistrationValues) => {
    const response = await AuthService.register(registrationData);

    return response.data;
  }
);

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (loginData: LoginValues) => {
    const response = await AuthService.login(loginData);

    return response.data;
  }
);
