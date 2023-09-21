import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import FormController from '../../UI/FormController';
import { EMAIL_PATTERN, USERNAME_PATTERN } from './constants';
import Button from '../../UI/Button';

export interface FirstRegistrationStepValues {
  username: string;
  email: string;
}

interface FirstRegistrationStepProps {
  onComplete: (stepValues: FirstRegistrationStepValues) => void;
}

const FirstRegistrationStep: FC<FirstRegistrationStepProps> = ({ onComplete }) => {
  const {
    control,
    formState: { isValid },
    handleSubmit
  } = useForm<FirstRegistrationStepValues>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<FirstRegistrationStepValues> = (data): void => {
    onComplete(data);
  };

  return (
    <>
      <FormController<FirstRegistrationStepValues>
        label="Come up with a username"
        errorMessage="Use Latin alphabet and numbers"
        name="username"
        control={control}
        rules={{
          required: true,
          pattern: USERNAME_PATTERN
        }}
      />
      <FormController<FirstRegistrationStepValues>
        label="Email"
        errorMessage="Please enter a valid email"
        name="email"
        control={control}
        rules={{
          required: true,
          pattern: EMAIL_PATTERN
        }}
      />
      <Button
        disabled={!isValid}
        onPress={handleSubmit(onSubmit)}
      >
        Next step
      </Button>
    </>
  );
};

export default FirstRegistrationStep;
