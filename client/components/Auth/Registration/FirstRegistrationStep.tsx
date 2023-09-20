import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import FormController from '../../UI/FormController';
import { EMAIL_PATTERN, USERNAME_PATTERN } from './constants';
import Button from '../../UI/Button';

interface FirstRegistrationStepValues {
  username: string;
  email: string;
}

const FirstRegistrationStep: FC = () => {
  const {
    control,
    formState: { isValid },
    handleSubmit
  } = useForm<FirstRegistrationStepValues>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<FirstRegistrationStepValues> = (data): void => {
    console.log(data);
  };

  return (
    <>
      <FormController<FirstRegistrationStepValues>
        name="username"
        control={control}
        label="Come up with a username"
        rules={{
          required: true,
          pattern: USERNAME_PATTERN
        }}
        errorMessage="Use Latin alphabet and numbers"
      />
      <FormController<FirstRegistrationStepValues>
        name="email"
        label="Email"
        control={control}
        rules={{
          required: true,
          pattern: EMAIL_PATTERN
        }}
        errorMessage="Please enter a valid email"
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
