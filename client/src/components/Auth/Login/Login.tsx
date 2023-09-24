import { FC } from 'react';
import { StyleSheet, Text } from 'react-native';
import { SubmitHandler, useForm } from 'react-hook-form';

import AuthLayout from '../AuthLayout';
import Screens from '../../../constants/screens';
import FormController from '../../UI/FormController';
import Button from '../../UI/Button';
import LoginValues from '../../../interfaces/login-values';
import Colors from '../../../constants/colors';
import Fonts from '../../../constants/fonts';

const Login: FC = () => {
  const { control, handleSubmit } = useForm<LoginValues>();

  const onSubmit: SubmitHandler<LoginValues> = data => {
    console.log(data);
  };

  const controllersErrorMessage = 'The field can not be empty';

  return (
    <AuthLayout title={Screens.LOGIN}>
      <FormController
        label="Username"
        name="username"
        errorMessage={controllersErrorMessage}
        control={control}
        rules={{ required: true }}
        style={styles.loginFormControllerUsername}
      />
      <FormController
        label="Password"
        name="password"
        errorMessage={controllersErrorMessage}
        control={control}
        rules={{ required: true }}
      />
      {(
        <Text style={styles.loginHttpErrorMessage}>
          Incorrect username or password!
        </Text>
      )}
      <Button onPress={handleSubmit(onSubmit)}>
        Login
      </Button>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  loginFormControllerUsername: {
    marginTop: 24
  },
  loginHttpErrorMessage: {
    color: Colors.MAIN_RED,
    fontFamily: Fonts.MONTSERRAT_MEDIUM,
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0.2,
    marginBottom: 12,
    marginLeft: 12
  }
});

export default Login;
