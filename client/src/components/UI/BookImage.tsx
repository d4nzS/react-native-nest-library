import { FC } from 'react';
import { Image, StyleSheet } from 'react-native';

import { API_URL } from '@env';
import Color from '../../constants/color';

interface BookImageProps {
  path: string;
  width: number;
  height: number;
}

const BookImage: FC<BookImageProps> = ({
                                         path,
                                         width,
                                         height
                                       }) => {
  return <Image
    source={{ uri: `${API_URL}/${path}` }}
    width={width}
    height={height}
    resizeMode="stretch"
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
