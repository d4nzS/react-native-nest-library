import { AxiosResponse } from 'axios';

import Book from '../interfaces/book';
import api from '../api/api';
import ApiUrl from '../constants/api-url';

class BookService {
  static async getAll(): Promise<AxiosResponse<Book[]>> {
    return api.get(ApiUrl.BOOKS);
  }
}

export default BookService;
