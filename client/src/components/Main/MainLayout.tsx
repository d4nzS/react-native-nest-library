import { FC, PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <View style={styles.mainLayout}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  mainLayout: {
    paddingTop: 24,
    paddingHorizontal: 16,
    paddingBottom: 8
  }
});

export default MainLayout;
