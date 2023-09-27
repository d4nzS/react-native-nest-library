import { FC, PropsWithChildren } from 'react';
import { StyleSheet, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Colors, { ORANGE_LINEAR_GRADIENT_PROPS } from '../../constants/colors';
import Fonts from '../../constants/fonts';
import AuthContent from './AuthContent';
import Blur from '../UI/Blur';
import Loader from '../UI/Loader';
import useAppSelector from '../../hooks/use-app-selector';
import authSelectors from '../../store/auth/auth-selectors';

interface AuthLayoutProps extends PropsWithChildren {
  title: string;
}

const AuthLayout: FC<AuthLayoutProps> = ({ title, children }) => {
  const isLoading = useAppSelector(authSelectors.isLoadingSelector);

  return (
    <>
      <LinearGradient
        {...ORANGE_LINEAR_GRADIENT_PROPS}
        style={styles.authLayout}
      >
        <Text style={styles.authLayoutTitle}>Cleverland</Text>
        <AuthContent title={title}>{children}</AuthContent>
      </LinearGradient>
      {isLoading && (
        <Blur>
          <Loader size={70}/>
        </Blur>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  view: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  authLayout: {
    flex: 1,
    justifyContent: 'center',
    padding: 16
  },
  authLayoutTitle: {
    color: Colors.MAIN_WHITE,
    fontFamily: Fonts.MONTSERRAT_BOLD,
    fontSize: 28,
    textAlign: 'center'
  }
});

export default AuthLayout;
