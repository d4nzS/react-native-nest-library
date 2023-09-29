import { FC, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { createDrawerNavigator, DrawerNavigationProp } from '@react-navigation/drawer';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Screen from '../../constants/screen';
import Library from './Library/Library';
import AsyncStorageKey from '../../constants/async-storage-key';
import { RootStackNavigationProp } from '../../../App';

type MainDrawerParamList = {
  [Screen.LIBRARY]: undefined;
}

export type MainStackNavigationProp = DrawerNavigationProp<MainDrawerParamList>;

const MainDrawer = createDrawerNavigator();

const MainScreen: FC = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  useEffect(() => {
    (async () => {
      const accessToken = await AsyncStorage.getItem(AsyncStorageKey.ACCESS_TOKEN);
      const refreshToken = await AsyncStorage.getItem(AsyncStorageKey.REFRESH_TOKEN);

      if (!accessToken || !refreshToken) {
        navigation.navigate(Screen.AUTH);
      }
    })();
  }, []);

  return (
    <MainDrawer.Navigator>
      <MainDrawer.Screen
        name={Screen.LIBRARY}
        component={Library}
      />
    </MainDrawer.Navigator>
  );
};

export default MainScreen;
