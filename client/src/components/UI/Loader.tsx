import { FC } from 'react';
import { ActivityIndicator } from 'react-native';

import Color from '../../constants/color';

interface LoaderProps {
  size: number;
}

const Loader: FC<LoaderProps> = ({ size }) => {
  return (
    <ActivityIndicator
      size={size}
      color={Color.MAIN_RED}
    />
  );
};

export default Loader;
