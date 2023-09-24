import { useNavigation } from '@react-navigation/native';

import { StackNavigationProp } from '../interfaces/navigation';

const useAppNavigation = useNavigation<StackNavigationProp>;

export default useAppNavigation;
