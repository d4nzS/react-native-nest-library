import { FC, useState } from 'react';
import { StyleSheet, Text } from 'react-native';

import AuthLayout from '../AuthLayout';
import Fonts from '../../../constants/fonts';
import Colors from '../../../constants/colors';
import FirstRegistrationStep, { FirstRegistrationStepValues } from './FirstRegistrationStep';
import { RegistrationSteps } from './constants';

interface RegistrationValues extends FirstRegistrationStepValues {}

const Registration: FC = () => {
  const [registrationStepIndex, setRegistrationStepIndex] = useState<RegistrationSteps>(RegistrationSteps.FIRST);
  const registrationValues: Partial<RegistrationValues> = {};

  const completeFirstRegistrationStep = (stepValues: FirstRegistrationStepValues): void => {
    setRegistrationStepIndex(RegistrationSteps.SECOND);

    registrationValues.email = stepValues.email;
    registrationValues.username = stepValues.username;

    console.log(registrationValues);
  };

  return (
    <AuthLayout title="Registration">
      <Text style={styles.registrationPromotion}>
        {registrationStepIndex} step out of 2
      </Text>
      {registrationStepIndex === RegistrationSteps.FIRST && <FirstRegistrationStep onComplete={completeFirstRegistrationStep}/>}
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
