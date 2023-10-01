import { FC } from 'react';
import { createDrawerNavigator, DrawerNavigationProp } from '@react-navigation/drawer';

import Screen from '../../constants/screen';
import LibraryScreen from './Library/LibraryScreen';

type MainDrawerParamList = {
  [Screen.LIBRARY]: undefined;
}

export type MainStackNavigationProp = DrawerNavigationProp<MainDrawerParamList>;

const MainDrawer = createDrawerNavigator();

const MainScreen: FC = () => {
  return (
    <MainDrawer.Navigator>
      <MainDrawer.Screen
        name={Screen.LIBRARY}
        component={LibraryScreen}
      />
    </MainDrawer.Navigator>
  );
};

export default MainScreen;
