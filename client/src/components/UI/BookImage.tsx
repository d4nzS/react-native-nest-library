import { FC } from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

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
  return <FastImage
    source={{ uri: `${API_URL}/${path}` }}
    defaultSource={require('../../assets/images/default-book-image.png')}
    resizeMode="stretch"
    style={[styles.bookImage, { width, height }]}
  />;
};

const styles = StyleSheet.create({
  bookImage: {
    borderColor: Color.GREY_BLACK40,
    borderWidth: 1
  }
});

export default BookImage;
