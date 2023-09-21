import { FC, PropsWithChildren } from 'react';
import { StyleSheet, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Colors, { ORANGE_LINEAR_GRADIENT_PROPS } from '../../constants/colors';
import Fonts from '../../constants/fonts';
import AuthContent from './AuthContent';

interface AuthLayoutProps extends PropsWithChildren {
  title: string;
}

const AuthLayout: FC<AuthLayoutProps> = ({ title, children }) => {
  return (
    <LinearGradient
      {...ORANGE_LINEAR_GRADIENT_PROPS}
      style={styles.authLayout}
    >
      <Text style={styles.authLayoutTitle}>Cleverland</Text>
      <AuthContent title={title}>{children}</AuthContent>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
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
