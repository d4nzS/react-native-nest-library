import { FC, PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';
import { BlurView } from '@react-native-community/blur';

const Blur: FC<PropsWithChildren> = ({ children }) => {
  return (
    <BlurView
      style={styles.blur}
      blurType="light"
      blurAmount={5}
      reducedTransparencyFallbackColor="white"
    >
      {children}
    </BlurView>
  );
};

const styles = StyleSheet.create({
  blur: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});

export default Blur;
