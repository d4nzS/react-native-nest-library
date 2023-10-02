import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { API_URL } from '@env';
import AsyncStorageKey from '../constants/async-storage-key';
import AuthService from '../services/auth-service';
import { store } from '../store/store';
import { authActions } from '../store/auth/auth-slice';

const api = axios.create({
  baseURL: API_URL
});

api.interceptors.request.use(async config => {
  if (!config.url?.includes('auth')) {
    const accessToken = await AsyncStorage.getItem(AsyncStorageKey.ACCESS_TOKEN);

    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  config => config,
  async error => {
    const originalRequest = error.config;
    const refreshTokenFromStorage = await AsyncStorage.getItem(AsyncStorageKey.REFRESH_TOKEN);

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

        await AsyncStorage.setItem(AsyncStorageKey.ACCESS_TOKEN, accessToken);
        await AsyncStorage.setItem(AsyncStorageKey.REFRESH_TOKEN, refreshToken);

        return api.request(originalRequest);
      } catch (error) {
        store.dispatch(authActions.logout());

        throw error;
      }
    }

    throw error;
  }
);

export default api;
