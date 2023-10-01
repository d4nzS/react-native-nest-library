import { FC, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Screen from '../constants/screen';
import MainScreen from './Main/MainScreen';
import AuthScreen from './Auth/AuthScreen';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import useAppSelector from '../hooks/use-app-selector';
import authSelectors from '../store/auth/auth-selectors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorageKey from '../constants/async-storage-key';
import useAppDispatch from '../hooks/use-app-dispatch';
import { authActions } from '../store/auth/auth-slice';

type RootStackParamList = {
  [Screen.AUTH]: undefined;
  [Screen.MAIN]: undefined;
};

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const RootStack = createNativeStackNavigator<RootStackParamList>();

const Root: FC = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(authSelectors.isLoggedInSelector);
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const accessToken = await AsyncStorage.getItem(AsyncStorageKey.ACCESS_TOKEN);
      const refreshToken = await AsyncStorage.getItem(AsyncStorageKey.REFRESH_TOKEN);

      if (accessToken && refreshToken) {
        dispatch(authActions.login());
      }

      setIsInitialLoading(false);
    })();
  }, []);

  if (isInitialLoading) {
    return (
      <View>
        <Text>Splash Screen</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        {isLoggedIn
          ? <RootStack.Screen
            name={Screen.MAIN}
            component={MainScreen}
            options={{ headerShown: false }}
          />
          : <RootStack.Screen
            name={Screen.AUTH}
            component={AuthScreen}
            options={{ headerShown: false }}
          />}
      </RootStack.Navigator>
    </NavigationContainer>
  )
};

export default Root;
