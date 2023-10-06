import { RootState } from '../store';

const bookSelectors = {
  booksSelector: ({ book }: RootState) => book.books
};

export default bookSelectors;
