import { FC } from 'react';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  DrawerNavigationProp
} from '@react-navigation/drawer';

import Screen from '../../constants/screen';
import LibraryScreen from './Library/LibraryScreen';
import useAppDispatch from '../../hooks/use-app-dispatch';
import ProfileScreen from './Profile/ProfileScreen';
import { logoutThunk } from '../../store/auth/auth-thunks';

type MainDrawerParamList = {
  [Screen.LIBRARY]: undefined;
}

export type MainStackNavigationProp = DrawerNavigationProp<MainDrawerParamList>;

const MainDrawer = createDrawerNavigator();

const MainDrawerContent: FC<DrawerContentComponentProps> = props => {
  const dispatch = useAppDispatch();

  const logoutHandler = (): void => {
    dispatch(logoutThunk());
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props}/>
      <DrawerItem label="Logout" onPress={logoutHandler}/>
    </DrawerContentScrollView>
  );
};

const MainScreen: FC = () => {
  return (
    <MainDrawer.Navigator drawerContent={props => <MainDrawerContent {...props}/>}>
      <MainDrawer.Screen
        name={Screen.LIBRARY}
        component={LibraryScreen}
      />
      <MainDrawer.Screen
        name={Screen.PROFILE}
        component={ProfileScreen}
      />
    </MainDrawer.Navigator>
  );
};

export default MainScreen;
