import { createAsyncThunk } from '@reduxjs/toolkit';
import EncryptedStorage from 'react-native-encrypted-storage';

import RegistrationValues from '../../interfaces/registration-values';
import AuthService from '../../services/auth-service';
import LoginValues from '../../interfaces/login-values';
import EncryptedStorageKey from '../../constants/encrypted-storage-key';

export const registrationThunk = createAsyncThunk(
  'auth/register',
  async (registrationData: RegistrationValues) => {
    await AuthService.register(registrationData);
  }
);

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (loginData: LoginValues) => {
    const response = await AuthService.login(loginData);

    return response.data;
  }
);

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async () => {
    const refreshToken = await EncryptedStorage.getItem(EncryptedStorageKey.REFRESH_TOKEN);

    if (refreshToken) {
      await AuthService.logout(refreshToken);
    }
  }
);

export const checkIsLoggedInThunk = createAsyncThunk(
  'auth/check-is-logged-in',
  async () => {
    const accessToken = await EncryptedStorage.getItem(EncryptedStorageKey.ACCESS_TOKEN);
    const refreshToken = await EncryptedStorage.getItem(EncryptedStorageKey.REFRESH_TOKEN);

    return Boolean(accessToken && refreshToken);
  }
);
