import { FC, ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';
import AuthModal from './AuthModal';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <LinearGradient
      colors={['#F9D423', '#F83600']}
      start={{ x: -1.9776 , y: 0 }}
      end={{ x: 1.5351, y: 0 }}
      style={styles.authLayout}
    >
      <Text style={styles.authLayoutTitle}>Cleverland</Text>
      <AuthModal title="Registartion">{children}</AuthModal>
    </LinearGradient>
  );
};

export default AuthLayout;

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
