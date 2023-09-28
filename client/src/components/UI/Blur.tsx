import { FC, PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';
import { BlurView } from '@react-native-community/blur';

const Blur: FC<PropsWithChildren> = ({ children }) => {
  return (
    <BlurView
      style={[styles.blur, StyleSheet.absoluteFill]}
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
    alignItems: 'center'
  }
});

export default Blur;
