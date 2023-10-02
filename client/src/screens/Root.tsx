import { FC, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Screen from '../constants/screen';
import MainScreen from './Main/MainScreen';
import AuthScreen from './Auth/AuthScreen';
import useAppSelector from '../hooks/use-app-selector';
import authSelectors from '../store/auth/auth-selectors';
import useAppDispatch from '../hooks/use-app-dispatch';
import { checkIsLoggedInThunk } from '../store/auth/auth-thunks';

type RootStackParamList = {
  [Screen.AUTH]: undefined;
  [Screen.MAIN]: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const Root: FC = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(authSelectors.isLoggedInSelector);
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      await dispatch(checkIsLoggedInThunk());

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
