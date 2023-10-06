import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

import { API_URL } from '@env';
import EncryptedStorageKey from '../constants/encrypted-storage-key';
import AuthService from '../services/auth-service';
import { store } from '../store/store';
import { logoutThunk } from '../store/auth/auth-thunks';

const api = axios.create({
  baseURL: API_URL
});

api.interceptors.request.use(async config => {
  if (!config.url?.includes('auth')) {
    const accessToken = await EncryptedStorage.getItem(EncryptedStorageKey.ACCESS_TOKEN);

    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  config => config,
  async error => {
    const originalRequest = error.config;
    const refreshTokenFromStorage = await EncryptedStorage.getItem(EncryptedStorageKey.REFRESH_TOKEN);

    if (
      refreshTokenFromStorage
      && error.response.status === 401
      && originalRequest
      && !originalRequest.isRetry
    ) {
      originalRequest.isRetry = true;

      try {
        const response = await AuthService.refresh(refreshTokenFromStorage);
        const { accessToken, refreshToken } = response.data;

        await EncryptedStorage.setItem(EncryptedStorageKey.ACCESS_TOKEN, accessToken);
        await EncryptedStorage.setItem(EncryptedStorageKey.REFRESH_TOKEN, refreshToken);

        return api.request(originalRequest);
      } catch (error) {
        store.dispatch(logoutThunk());

        throw error;
      }
    }

    throw error;
  }
);

export default api;
