import { FC, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import Fonts from './constants/fonts';
import RegistrationScreen from './screens/RegistrationScreen';

SplashScreen.preventAutoHideAsync();

const App: FC = () => {
  const [fontsLoaded] = useFonts({
    [Fonts.MONTSERRAT_MEDIUM]: require('./assets/fonts/Montserrat-Medium.otf'),
    [Fonts.MONTSERRAT_BOLD]: require('./assets/fonts/Montserrat-Bold.otf')
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.app} onLayout={onLayoutRootView}>
      <RegistrationScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1
  }
});

export default App;
