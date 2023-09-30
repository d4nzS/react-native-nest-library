import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Color from '../../../constants/color';
import BookImage from '../../UI/BookImage';
import Font from '../../../constants/font';
import Button from '../../UI/Button';

const BookItem: FC = () => {
  return (
    <View style={styles.bookItem}>
      <BookImage
        uri="https://library-cleverland.fra1.digitaloceanspaces.com/03697fa3fb8d15feccdf8786879272a6.webp"
        width={70}
        height={100}
      />
      <View style={styles.bookItemInfo}>
        <Text style={styles.bookItemTitle}>xD Boss</Text>
        <Text style={styles.bookItemAdditionalInfo}>fgfd dg dgsgdfg d </Text>
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
