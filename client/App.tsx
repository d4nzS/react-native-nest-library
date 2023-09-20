import { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import RegistrationScreen from './screens/RegistrationScreen';

const App: FC = () => {
  return (
    <View style={styles.app}>
      <RegistrationScreen/>
    </View>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1
  }
});

export default App;
