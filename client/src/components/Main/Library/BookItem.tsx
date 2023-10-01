import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Color from '../../../constants/color';
import BookImage from '../../UI/BookImage';
import Font from '../../../constants/font';
import Button from '../../UI/Button';

interface BookItemProps {
  title: string;
  author: string;
  imagePath: string;
}

const BookItem: FC<BookItemProps> = ({
                                       title,
                                       author,
                                       imagePath
                                     }) => {
  return (
    <View style={styles.bookItem}>
      <BookImage
        path={imagePath}
        width={70}
        height={100}
      />
      <View style={styles.bookItemInfo}>
        <Text style={styles.bookItemTitle}>{title}</Text>
        <Text style={styles.bookItemAdditionalInfo}>{author}</Text>
        <Button onPress={() => {}}>
          Read
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bookItem: {
    flexDirection: 'row',
    columnGap: 8,
    backgroundColor: Color.MAIN_WHITE,
    borderRadius: 10,
    paddingVertical: 16,
    paddingLeft: 8,
    paddingRight: 16
  },
  bookItemInfo: {
    flex: 1
  },
  bookItemTitle: {
    color: Color.MAIN_DARK,
    fontFamily: Font.MONTSERRAT_SEMI_BOLD,
    fontSize: 14,
    marginBottom: 3
  },
  bookItemAdditionalInfo: {
    color: Color.MAIN_DARK,
    fontFamily: Font.MONTSERRAT_REGULAR,
    fontSize: 12,
    marginBottom: 'auto'
  }
});

export default BookItem;
