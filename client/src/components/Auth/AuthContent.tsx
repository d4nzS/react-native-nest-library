import { FC, PropsWithChildren } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';

interface AuthContentProps extends PropsWithChildren {
  title: string;
}

const AuthContent: FC<AuthContentProps> = ({ title, children }) => {
  return (
    <View style={styles.AuthContent}>
      <Text style={styles.AuthContentTitle}>{title}</Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  AuthContent: {
    backgroundColor: Colors.MAIN_WHITE,
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginTop: 12
  },
  AuthContentTitle: {
    color: Colors.MAIN_DARK,
    fontFamily: Fonts.MONTSERRAT_BOLD,
    fontSize: 24,
    lineHeight: 30
  }
});

export default AuthContent;
