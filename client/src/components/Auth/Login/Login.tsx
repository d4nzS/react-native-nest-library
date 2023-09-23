import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { SubmitHandler, useForm } from 'react-hook-form';

import AuthLayout from '../AuthLayout';
import Screens from '../../../constants/screens';
import FormController from '../../UI/FormController';
import Button from '../../UI/Button';
import LoginValues from '../../../interfaces/login-values';

const Login: FC = () => {
  const { control, handleSubmit } = useForm<LoginValues>();

  const onSubmit: SubmitHandler<LoginValues> = data => {
    console.log(data);
  };

  const errorMessage = 'The field can not be empty';

  return (
    <AuthLayout title={Screens.LOGIN}>
      <FormController
        label="Username"
        name="username"
        errorMessage={errorMessage}
        control={control}
        rules={{ required: true }}
        style={styles.loginFormControllerUsername}
      />
      <FormController
        label="Password"
        name="password"
        errorMessage={errorMessage}
        control={control}
        rules={{ required: true }}
      />
      <Button onPress={handleSubmit(onSubmit)}>
        Login
      </Button>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  loginFormControllerUsername: {
    marginTop: 24
  }
});

export default Login;
