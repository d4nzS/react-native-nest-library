import { FC } from 'react';
import { Image, StyleSheet } from 'react-native';
import Color from '../../constants/color';

interface BookImageProps {
  uri: string;
  width: number;
  height: number;
}

const BookImage: FC<BookImageProps> = ({
                                         uri,
                                         width,
                                         height
                                       }) => {
  return <Image
    source={{ uri }}
    width={width}
    height={height}
    style={styles.bookImage}
  />
};

const styles = StyleSheet.create({
  bookImage: {
    borderColor: Color.GREY_BLACK40,
    borderWidth: 1
  }
});

export default BookImage;
