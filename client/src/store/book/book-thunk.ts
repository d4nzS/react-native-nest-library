import { createAsyncThunk } from '@reduxjs/toolkit';
import BookService from '../../services/book-service';

export const getAllBooksThunk = createAsyncThunk(
  'book/getAll',
  async () => {
    const response = await BookService.getAll();

    return response.data;
  }
);
