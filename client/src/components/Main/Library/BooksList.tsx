import { FC, useCallback } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, View } from 'react-native';

import BookItem from './BookItem';

const BooksList: FC = () => {
  const renderBookItem = useCallback(({ item }: ListRenderItemInfo<string>) => <BookItem/>, []);

  return (
    <FlatList
      renderItem={renderBookItem}
      data={['TEST', 'TEST', 'TEST']}
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
