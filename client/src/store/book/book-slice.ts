import { createSlice } from '@reduxjs/toolkit';

import Book from '../../interfaces/book';
import { getAllBooksThunk } from './book-thunk';

interface BookState {
  books: Book[];
}

const initialState: BookState = {
  books: []
};

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {

  },
  extraReducers: builder => {
    builder
      .addCase(getAllBooksThunk.fulfilled, (state, action) => {
        state.books = action.payload;
      })
  }
});

export default bookSlice;
