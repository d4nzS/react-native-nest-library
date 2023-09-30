import { AxiosResponse } from 'axios';

import api from '../api/api';
import ApiUrl from '../constants/api-url';
import RegistrationValues from '../interfaces/registration-values';
import LoginValues from '../interfaces/login-values';
import LoginResponse from '../interfaces/login-response';

class AuthService {
  static async register(registrationData: RegistrationValues): Promise<AxiosResponse<void>> {
    return api.post(ApiUrl.REGISTRATION, registrationData);
  }

  static async login(loginData: LoginValues): Promise<AxiosResponse<LoginResponse>> {
    return api.post(ApiUrl.LOGIN, loginData);
  }

  static async refresh(refreshToken: string): Promise<AxiosResponse<LoginResponse>> {
    return api.post(ApiUrl.REFRESH, { refreshToken });
  }
}

export default AuthService;
