import { FC, PropsWithChildren } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import Color from '../../constants/color';
import Font from '../../constants/font';
import ArrowIcon from '../../assets/icons/arrow-icon.svg';
import Screen from '../../constants/screen';
import { AuthStackNavigationProp } from '../../screens/AuthScreen';

interface AuthContentProps extends PropsWithChildren {
  title: string;
}

const AuthContent: FC<AuthContentProps> = ({ title, children }) => {
  const navigation = useNavigation<AuthStackNavigationProp>();
  const isLogin = useRoute().name === Screen.LOGIN;

  const linkHandler = (): void => {
    navigation.navigate(isLogin ? Screen.REGISTRATION : Screen.LOGIN);
  };

  return (
    <View style={styles.authContent}>
      <Text style={styles.authContentTitle}>{title}</Text>
      {children}
      <View style={styles.authContentAccountContainer}>
        <Text style={styles.authContentText}>
          {isLogin ? 'Do not have an account?' : 'Have an account?'}
        </Text>
        <Pressable style={styles.authContentLink} onPress={linkHandler}>
          <Text style={styles.authContentLinkText}>
            {isLogin ? 'Registration' : 'Login'}
          </Text>
          <ArrowIcon/>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  authContent: {
    backgroundColor: Color.MAIN_WHITE,
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginTop: 12
  },
  authContentTitle: {
    color: Color.MAIN_DARK,
    fontFamily: Font.MONTSERRAT_BOLD,
    fontSize: 24,
    lineHeight: 30
  },
  authContentAccountContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    rowGap: 7,
    columnGap: 16,
    marginTop: 16
  },
  authContentText: {
    color: Color.GREY_BLACK70,
    fontFamily: Font.MONTSERRAT_REGULAR,
    fontSize: 15,
    lineHeight: 20
  },
  authContentLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  authContentLinkText: {
    color: Color.MAIN_DARK,
    fontFamily: Font.MONTSERRAT_SEMI_BOLD,
    fontSize: 14,
    letterSpacing: 0.2,
    textTransform: 'uppercase'
  }
});

export default AuthContent;
