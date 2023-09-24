import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Screens from '../constants/screens';

type RootStackParamList = {
  [Screens.LOGIN]: undefined
  [Screens.REGISTRATION]: undefined,
};

export type StackNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default RootStackParamList;
