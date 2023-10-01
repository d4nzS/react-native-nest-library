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
import { authActions } from '../../store/auth/auth-slice';

type MainDrawerParamList = {
  [Screen.LIBRARY]: undefined;
}

export type MainStackNavigationProp = DrawerNavigationProp<MainDrawerParamList>;

const MainDrawer = createDrawerNavigator();

const MainDrawerContent: FC<DrawerContentComponentProps> = props => {
  const dispatch = useAppDispatch();

  const logoutHandler = (): void => {
    dispatch(authActions.logout());
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
    </MainDrawer.Navigator>
  );
};

export default MainScreen;
