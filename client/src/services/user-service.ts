import { AxiosResponse } from 'axios';

import UserData from '../interfaces/user-data';
import api from '../api/api';
import ApiUrl from '../constants/api-url';

class UserService {
  static async getCurrentUser(): Promise<AxiosResponse<UserData>> {
    return api.get(ApiUrl.GET_CURRENT_USER);
  }
}

export default UserService;
