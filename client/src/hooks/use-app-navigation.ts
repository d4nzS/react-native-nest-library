import { useNavigation } from '@react-navigation/native';

import { StackNavigationProp } from '../../App';

const useAppNavigation = useNavigation<StackNavigationProp>;

export default useAppNavigation;
