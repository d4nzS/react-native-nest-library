import { FC, ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';

interface AuthModalProps {
  title: string;
  children: ReactNode;
}

const AuthModal: FC<AuthModalProps> = ({ title, children }) => {
  return (
    <View style={styles.authModal}>
      <Text style={styles.authModalTitle}>{title}</Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  authModal: {
    backgroundColor: Colors.MAIN_WHITE,
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginTop: 12
  },
  authModalTitle: {
    color: Colors.MAIN_DARK,
    fontFamily: Fonts.MONTSERRAT_BOLD,
    fontSize: 24,
    lineHeight: 30
  }
});

export default AuthModal;
