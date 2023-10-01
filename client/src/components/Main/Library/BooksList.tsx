import { FC, useCallback } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, View } from 'react-native';

import BookItem from './BookItem';
import useAppSelector from '../../../hooks/use-app-selector';
import bookSelectors from '../../../store/book/book-selectors';
import Book from '../../../interfaces/book';
import { BOOK_ITEM_HEIGHT } from './constants';

const BooksList: FC = () => {
  const books = useAppSelector(bookSelectors.booksSelector);

  const getBookItemLayout = useCallback((_: ArrayLike<Book> | null | undefined, index: number) => ({
    length: BOOK_ITEM_HEIGHT,
    offset: BOOK_ITEM_HEIGHT * index,
    index
  }), []);

  const renderBookItem = useCallback(({ item }: ListRenderItemInfo<Book>) => <BookItem {...item}/>, []);

  return (
    <FlatList
      keyExtractor={(item) => item._id}
      getItemLayout={getBookItemLayout}
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
