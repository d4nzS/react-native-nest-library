import { FC } from 'react';
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';

import BookItem from './BookItem';
import useAppSelector from '../../../hooks/use-app-selector';
import bookSelectors from '../../../store/book/book-selectors';
import Book from '../../../interfaces/book';
import { BOOK_ITEM_HEIGHT } from './constants';

const keyBookExtractor = (item: Book): string => item.id;

const getBookItemLayout = (_: ArrayLike<Book> | null | undefined, index: number): {
  length: number;
  offset: number;
  index: number
} => ({
  length: BOOK_ITEM_HEIGHT,
  offset: BOOK_ITEM_HEIGHT * index,
  index
});

const renderBookItem: ListRenderItem<Book> = ({ item })  => <BookItem {...item}/>;

const ItemSeparatorComponent: FC = () => <View style={styles.booksListSeparator}/>;

const BooksList: FC = () => {
  const books = useAppSelector(bookSelectors.booksSelector);

  return (
    <FlatList
      keyExtractor={keyBookExtractor}
      getItemLayout={getBookItemLayout}
      renderItem={renderBookItem}
      data={books}
      ItemSeparatorComponent={ItemSeparatorComponent}
    />
  );
};

const styles = StyleSheet.create({
  booksListSeparator: {
    height: 16
  }
});

export default BooksList;
