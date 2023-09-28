import { FC } from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';

import { store } from './src/store/store';
import Screen from './src/constants/screen';
import AuthScreen from './src/screens/AuthScreen';

type RootStackParamList = {
  [Screen.AUTH]: undefined;
};

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const RootStack = createNativeStackNavigator<RootStackParamList>();

const App: FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Screen
            name={Screen.AUTH}
            component={AuthScreen}
            options={{ headerShown: false }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
