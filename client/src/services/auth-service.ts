import { AxiosResponse } from 'axios';

import api from '../api/api';
import ApiUrls from '../constants/api-urls';
import RegistrationValues from '../interfaces/registration-values';

class AuthService {
  static async registration(registrationData: RegistrationValues): Promise<AxiosResponse<void>> {
    return api.post(ApiUrls.REGISTRATION, registrationData);
  }
}

export default AuthService;
