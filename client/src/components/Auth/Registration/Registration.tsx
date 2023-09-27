import { FC, useEffect, useRef, useState } from 'react';
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
import useAppDispatch from '../../../hooks/use-app-dispatch';
import { registrationThunk } from '../../../store/auth/auth-thunks';
import useAppSelector from '../../../hooks/use-app-selector';
import authSelectors from '../../../store/auth/auth-selectors';
import Errors from '../../../constants/errors';
import { authActions } from '../../../store/auth/auth-slice';

const Registration: FC = () => {
  const navigation = useNavigation<AuthStackNavigationProp>();
  const dispatch = useAppDispatch();
  const errorCode = useAppSelector(authSelectors.errorCodeSelector);
  const isSucceed = useAppSelector(authSelectors.isSucceedSelector);
  const [registrationStep, setRegistrationStep] = useState<RegistrationStep>(RegistrationStep.FIRST);
  const registrationValues = useRef<Partial<RegistrationValues>>({});

  useEffect(() => {
    if (isSucceed) {
      createSuccessAlert();
    }

    if (errorCode === Errors.BAD_REQUEST) {
      createBadRequestErrorAlert()
    }

    if (errorCode === Errors.UNKNOWN) {
      createUnknownErrorAlert();
    }
  }, [isSucceed, errorCode]);

  const completeFirstRegistrationStep = (stepValues: FirstRegistrationStepValues): void => {
    setRegistrationStep(RegistrationStep.SECOND);
    registrationValues.current.username = stepValues.username;
    registrationValues.current.email = stepValues.email;
  };

  const completeSecondRegistrationStep = (stepValues: SecondRegistrationStepValues): void => {
    registrationValues.current.password = stepValues.password;
    registrationValues.current.confirmPassword = stepValues.confirmPassword;

    dispatch(registrationThunk(registrationValues.current as RegistrationValues));
  };

  const createSuccessAlert = (): void => {
    Alert.alert(
      'Registration Successful',
      'Registration was successful. Please log in to your account using your username and password.',
      [
        { text: 'Login', onPress: () => navigation.navigate(Screens.LOGIN) }
      ]
    );

    dispatch(authActions.clearIsSucceed());
  };

  const createBadRequestErrorAlert = (): void => {
    Alert.alert(
      'Data Not Saved',
      'This username or email is already registered in the system. Please try registering with a different username or email.',
      [
        { text: 'Back to Registration', onPress: () => navigation.replace(Screens.REGISTRATION) }
      ]
    );

    dispatch(authActions.clearErrorCode());
  };

  const createUnknownErrorAlert = (): void => {
    Alert.alert(
      'Data Not Saved',
      'Something went wrong, and your registration did not complete. Please try again.',
      [
        { text: 'Retry', onPress: () => navigation.replace(Screens.REGISTRATION) }
      ]
    );

    dispatch(authActions.clearErrorCode());
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
