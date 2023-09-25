import { FC, useRef, useState } from 'react';
import { Alert, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import AuthLayout from '../AuthLayout';
import Fonts from '../../../constants/fonts';
import Colors from '../../../constants/colors';
import FirstRegistrationStep, { FirstRegistrationStepValues } from './FirstRegistrationStep';
import { RegistrationStep } from './constants';
import SecondRegistrationStep, { SecondRegistrationStepValues } from './SecondRegistrationStep';
import Screens from '../../../constants/screens';
import RegistrationValues from '../../../interfaces/registration-values';
import { AuthStackNavigationProp } from '../../../screens/AuthScreen';

const Registration: FC = () => {
  const navigation = useNavigation<AuthStackNavigationProp>();
  const [registrationStep, setRegistrationStep] = useState<RegistrationStep>(RegistrationStep.FIRST);
  const registrationValues = useRef<Partial<RegistrationValues>>({});

  const completeFirstRegistrationStep = (stepValues: FirstRegistrationStepValues): void => {
    setRegistrationStep(RegistrationStep.SECOND);
    registrationValues.current.username = stepValues.username;
    registrationValues.current.email = stepValues.email;
  };

  const completeSecondRegistrationStep = (stepValues: SecondRegistrationStepValues): void => {
    registrationValues.current.password = stepValues.password;
    registrationValues.current.confirmPassword = stepValues.confirmPassword;

    console.log(registrationValues.current);
    createBadRequestErrorAlert();
  };

  const createSuccessAlert = (): void => {
    Alert.alert(
      'Registration Successful',
      'Registration was successful. Please log in to your account using your username and password.',
      [
        { text: 'Login', onPress: () => navigation.navigate(Screens.LOGIN) }
      ]
    );
  };

  const createBadRequestErrorAlert = (): void => {
    Alert.alert(
      'Data Not Saved',
      'This username or email is already registered in the system. Please try registering with a different username or email.',
      [
        { text: 'Back to Registration', onPress: () => navigation.replace(Screens.REGISTRATION) }
      ]
    );
  };

  const createUnknownErrorAlert = (): void => {
    Alert.alert(
      'Data Not Saved',
      'Something went wrong, and your registration did not complete. Please try again.',
      [
        { text: 'Retry', onPress: () => navigation.replace(Screens.REGISTRATION) }
      ]
    );
  };

  const registrationStepsElements = {
    [RegistrationStep.FIRST]: <FirstRegistrationStep onComplete={completeFirstRegistrationStep}/>,
    [RegistrationStep.SECOND]: <SecondRegistrationStep onComplete={completeSecondRegistrationStep}/>
  };

  return (
    <AuthLayout title={Screens.REGISTRATION}>
      <Text style={styles.registrationPromotion}>
        {registrationStep} step out of 2
      </Text>
      {registrationStepsElements[registrationStep]}
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
