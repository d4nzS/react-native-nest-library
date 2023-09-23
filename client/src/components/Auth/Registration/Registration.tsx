import { FC, useRef, useState } from 'react';
import { StyleSheet, Text } from 'react-native';

import AuthLayout from '../AuthLayout';
import Fonts from '../../../constants/fonts';
import Colors from '../../../constants/colors';
import FirstRegistrationStep, { FirstRegistrationStepValues } from './FirstRegistrationStep';
import { RegistrationStep } from './constants';
import SecondRegistrationStep, { SecondRegistrationStepValues } from './SecondRegistrationStep';
import Screens from '../../../constants/screens';
import RegistrationValues from '../../../interfaces/registration-values';

const Registration: FC = () => {
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
