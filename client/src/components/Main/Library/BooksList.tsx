import { FC, useCallback } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, View } from 'react-native';

import BookItem from './BookItem';
import useAppSelector from '../../../hooks/use-app-selector';
import bookSelectors from '../../../store/book/book-selectors';
import Book from '../../../interfaces/book';

const BooksList: FC = () => {
  const books = useAppSelector(bookSelectors.booksSelector);
  const renderBookItem = useCallback(({ item }: ListRenderItemInfo<Book>) => <BookItem/>, []);

  return (
    <FlatList
      renderItem={renderBookItem}
      data={books}
      ItemSeparatorComponent={() => <View style={styles.booksListSeparator}/>}
    />
  );
};

const styles = StyleSheet.create({
  booksListSeparator: {
    height: 16
  }
});

export default BooksList;
