import { FC } from 'react';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';

import Screens from '../constants/screens';
import LoginScreen from './LoginScreen';
import RegistrationScreen from './RegistrationScreen';
import AuthLayout from '../components/Auth/AuthLayout';
import AuthContent from '../components/Auth/AuthContent';

type AuthStackParamList = {
  [Screens.LOGIN]: undefined;
  [Screens.REGISTRATION]: undefined;
}

export type AuthStackNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

const AuthStack = createNativeStackNavigator();

const AuthScreen: FC = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name={Screens.LOGIN}
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name={Screens.REGISTRATION}
        component={RegistrationScreen}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthScreen;
