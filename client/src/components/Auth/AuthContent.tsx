import { FC, PropsWithChildren } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';

import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';
import ArrowIcon from '../../assets/icons/arrow-icon.svg';
import Screens from '../../constants/screens';
import useAppNavigation from '../../hooks/use-app-navigation';

interface AuthContentProps extends PropsWithChildren {
  title: string;
}

const AuthContent: FC<AuthContentProps> = ({ title, children }) => {
  const navigation = useAppNavigation();
  const isLogin = useRoute().name === Screens.LOGIN;

  const linkHandler = (): void => {
    navigation.navigate(isLogin ? Screens.REGISTRATION : Screens.LOGIN);
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
    backgroundColor: Colors.MAIN_WHITE,
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginTop: 12
  },
  authContentTitle: {
    color: Colors.MAIN_DARK,
    fontFamily: Fonts.MONTSERRAT_BOLD,
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
    color: Colors.GREY_BLACK70,
    fontFamily: Fonts.MONTSERRAT_REGULAR,
    fontSize: 15,
    lineHeight: 20
  },
  authContentLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  authContentLinkText: {
    color: Colors.MAIN_DARK,
    fontFamily: Fonts.MONTSERRAT_SEMI_BOLD,
    fontSize: 14,
    letterSpacing: 0.2,
    textTransform: 'uppercase'
  }
});

export default AuthContent;
