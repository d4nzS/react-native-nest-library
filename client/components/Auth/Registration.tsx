import { FC } from 'react';

import AuthLayout from './AuthLayout';
import FormController from '../UI/FormController';

const Registration: FC = () => {
  return (
    <AuthLayout title="Registration">
      <FormController
        label="Come up with a username"
        errorMessage="Use only Latin alphabet and numbers"
      />
    </AuthLayout>
  );
};

export default Registration;
