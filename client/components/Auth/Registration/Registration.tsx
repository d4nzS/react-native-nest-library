import { FC, useMemo, useState } from 'react';
import { StyleSheet, Text } from 'react-native';

import AuthLayout from '../AuthLayout';
import Fonts from '../../../constants/fonts';
import Colors from '../../../constants/colors';
import FirstRegistrationStep, { FirstRegistrationStepValues } from './FirstRegistrationStep';
import { RegistrationSteps } from './constants';
import SecondRegistrationStep, { SecondRegistrationStepValues } from './SecondRegistrationStep';

interface RegistrationValues extends FirstRegistrationStepValues, SecondRegistrationStepValues {
}

const Registration: FC = () => {
  const [registrationStepIndex, setRegistrationStepIndex] = useState<RegistrationSteps>(RegistrationSteps.FIRST);
  const registrationValues = useMemo<Partial<RegistrationValues>>(() => ({}), []);

  const completeFirstRegistrationStep = (stepValues: FirstRegistrationStepValues): void => {
    setRegistrationStepIndex(RegistrationSteps.SECOND);
    registrationValues.username = stepValues.username;
    registrationValues.email = stepValues.email;
  };

  const completeSecondRegistrationStep = (stepValues: SecondRegistrationStepValues): void => {
    registrationValues.password = stepValues.password;
    registrationValues.confirmPassword = stepValues.confirmPassword;

    console.log(registrationValues);
  };

  return (
    <AuthLayout title="Registration">
      <Text style={styles.registrationPromotion}>
        {registrationStepIndex} step out of 2
      </Text>
      {registrationStepIndex === RegistrationSteps.FIRST && <FirstRegistrationStep onComplete={completeFirstRegistrationStep}/>}
      {registrationStepIndex === RegistrationSteps.SECOND && <SecondRegistrationStep onComplete={completeSecondRegistrationStep}/> }
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
