import { FC } from 'react';
import { StyleSheet, Text } from 'react-native';

import AuthLayout from '../AuthLayout';
import Fonts from '../../../constants/fonts';
import Colors from '../../../constants/colors';
import FirstRegistrationStep from './FirstRegistrationStep';

const Registration: FC = () => {
  return (
    <AuthLayout title="Registration">
      <Text style={styles.registrationPromotion}>1 step out of 2</Text>
      <FirstRegistrationStep/>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  registrationPromotion: {
    color: Colors.MAIN_DARK,
    fontFamily: Fonts.MONTSERRAT_SEMI_BOLD,
    fontSize: 14,
    marginTop: 8,
    marginBottom: 24
  }
});

export default Registration;
