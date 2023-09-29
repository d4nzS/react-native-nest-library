import { FC, useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import AuthLayout from '../AuthLayout';
import Font from '../../../constants/font';
import Color from '../../../constants/color';
import FirstRegistrationStep, { FirstRegistrationStepValues } from './FirstRegistrationStep';
import { RegistrationStep } from './constants';
import SecondRegistrationStep, { SecondRegistrationStepValues } from './SecondRegistrationStep';
import Screen from '../../../constants/screen';
import RegistrationValues from '../../../interfaces/registration-values';
import { AuthStackNavigationProp } from '../../../screens/Auth/AuthScreen';
import useAppDispatch from '../../../hooks/use-app-dispatch';
import { registrationThunk } from '../../../store/auth/auth-thunks';
import useAppSelector from '../../../hooks/use-app-selector';
import authSelectors from '../../../store/auth/auth-selectors';
import { authActions } from '../../../store/auth/auth-slice';

const Registration: FC = () => {
  const navigation = useNavigation<AuthStackNavigationProp>();
  const dispatch = useAppDispatch();
  const error = useAppSelector(authSelectors.errorSelector);
  const isSucceed = useAppSelector(authSelectors.isSucceedSelector);
  const [registrationStep, setRegistrationStep] = useState<RegistrationStep>(RegistrationStep.FIRST);
  const registrationValues = useRef<Partial<RegistrationValues>>({});

  useEffect(() => {
    if (isSucceed) {
      Alert.alert(
        'Registration Successful',
        'Registration was successful. Please log in to your account using your username and password.',
        [{
          text: 'Login', onPress: () => {
            dispatch(authActions.clearIsSucceed());
            navigation.navigate(Screen.LOGIN);
          }
        }]
      );
    }

    if (error) {
      Alert.alert(error.title, error.message, [{
          text: 'Retry',
          onPress: () => {
            dispatch(authActions.clearError());
            navigation.replace(Screen.REGISTRATION);
          }
        }]
      );
    }
  }, [isSucceed, error]);

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

  const registrationStepsElements = {
    [RegistrationStep.FIRST]: <FirstRegistrationStep onComplete={completeFirstRegistrationStep}/>,
    [RegistrationStep.SECOND]: <SecondRegistrationStep onComplete={completeSecondRegistrationStep}/>
  };

  return (
    <AuthLayout title={Screen.REGISTRATION}>
      <Text style={styles.registrationPromotion}>
        {registrationStep} step out of 2
      </Text>
      {registrationStepsElements[registrationStep]}
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  registrationPromotion: {
    color: Color.MAIN_DARK,
    fontFamily: Font.MONTSERRAT_SEMI_BOLD,
    fontSize: 14,
    marginTop: 8,
    marginBottom: 24
  }
});

export default Registration;
