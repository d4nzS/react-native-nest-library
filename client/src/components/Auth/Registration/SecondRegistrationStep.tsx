import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import FormController from '../../UI/FormController';
import Button from '../../UI/Button';
import RegistrationValues from '../../../interfaces/registration-values';
import { PASSWORD_MIN_LENGTH } from '../../../constants/validation';

export type SecondRegistrationStepValues = Pick<RegistrationValues, 'password' | 'confirmPassword'>;

interface SecondRegistrationStepProps {
  onComplete: (stepValues: SecondRegistrationStepValues) => void;
}

const SecondRegistrationStep: FC<SecondRegistrationStepProps> = ({ onComplete }) => {
  const {
    control,
    getValues,
    formState: { isValid},
    handleSubmit
  } = useForm<SecondRegistrationStepValues>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<SecondRegistrationStepValues> = (data): void => {
    onComplete(data);
  };

  return (
    <>
      <FormController
        secureTextEntry
        label="Password"
        errorMessage="Password must be at least 8 characters"
        name="password"
        control={control}
        rules={{
          required: true,
          minLength: PASSWORD_MIN_LENGTH
        }}
      />
      <FormController
        secureTextEntry
        label="Confirm password"
        errorMessage="Passwords must match"
        name="confirmPassword"
        control={control}
        rules={{
          required: true,
          validate: () => getValues().password === getValues().confirmPassword
        }}
      />
      <Button
        disabled={!isValid}
        onPress={handleSubmit(onSubmit)}
      >
        Complete Registration
      </Button>
    </>
  );
};

export default SecondRegistrationStep;
