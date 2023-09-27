import { FC } from 'react';
import { ActivityIndicator } from 'react-native';

import Colors from '../../constants/colors';

interface LoaderProps {
  size: number;
}

const Loader: FC<LoaderProps> = ({ size }) => {
  return (
    <ActivityIndicator
      size={size}
      color={Colors.MAIN_RED}
    />
  );
};

export default Loader;
