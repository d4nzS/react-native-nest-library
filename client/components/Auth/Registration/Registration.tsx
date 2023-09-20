import { FC } from 'react';
import { useForm } from 'react-hook-form';

import AuthLayout from '../AuthLayout';
import FormController from '../../UI/FormController';
import { EMAIL_PATTERN, USERNAME_PATTERN } from './constants';
import Button from '../../UI/Button';

const Registration: FC = () => {
  const { control, handleSubmit } = useForm({
    mode: 'onChange'
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <AuthLayout title="Registration">
      <FormController
        name="username"
        control={control}
        label="Come up with a username"
        rules={{
          required: true,
          pattern: USERNAME_PATTERN
        }}
        errorMessage="Use Latin alphabet and numbers"
      />
      <FormController
        name="email"
        label="Email"
        control={control}
        rules={{
          required: true,
          pattern: EMAIL_PATTERN
        }}
        errorMessage="Please enter a valid email"
      />
      <Button>Next step</Button>
    </AuthLayout>
  );
};

export default Registration;
