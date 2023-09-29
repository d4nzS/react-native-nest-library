import { FC } from 'react';
import { createDrawerNavigator, DrawerNavigationProp } from '@react-navigation/drawer';

import Screen from '../../constants/screen';
import Library from './Library/Library';

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
        component={Library}
      />
    </MainDrawer.Navigator>
  );
};

export default MainScreen;
