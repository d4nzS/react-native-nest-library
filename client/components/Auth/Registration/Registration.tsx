import { FC } from 'react';
import { useForm } from 'react-hook-form';

import AuthLayout from '../AuthLayout';
import FormController from '../../UI/FormController';
import { USERNAME_PATTERN } from './constants';

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
        rules={{
          required: true,
          pattern: USERNAME_PATTERN
        }}
        label="Come up with a username"
        errorMessage="Use Latin alphabet and numbers"
      />
    </AuthLayout>
  );
};

export default Registration;
