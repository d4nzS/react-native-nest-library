import { FC } from 'react';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';

import Screen from '../../constants/screen';
import LoginScreen from './Login/LoginScreen';
import RegistrationScreen from './Registration/RegistrationScreen';

type AuthStackParamList = {
  [Screen.LOGIN]: undefined;
  [Screen.REGISTRATION]: undefined;
}

export type AuthStackNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

const AuthStack = createNativeStackNavigator();

const AuthScreen: FC = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name={Screen.LOGIN}
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name={Screen.REGISTRATION}
        component={RegistrationScreen}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthScreen;
