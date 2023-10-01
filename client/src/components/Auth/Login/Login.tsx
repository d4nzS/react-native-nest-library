import { FC, useCallback } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { SubmitHandler, useForm } from 'react-hook-form';

import AuthLayout from '../AuthLayout';
import Screen from '../../../constants/screen';
import FormController from '../../UI/FormController';
import Button from '../../UI/Button';
import LoginValues from '../../../interfaces/login-values';
import useAppDispatch from '../../../hooks/use-app-dispatch';
import { loginThunk } from '../../../store/auth/auth-thunks';
import useAppSelector from '../../../hooks/use-app-selector';
import authSelectors from '../../../store/auth/auth-selectors';
import { authActions } from '../../../store/auth/auth-slice';
import { RootStackNavigationProp } from '../../../screens/Root';

const Login: FC = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const isSucceed = useAppSelector(authSelectors.isSucceedSelector);
  const dispatch = useAppDispatch();
  const error = useAppSelector(authSelectors.errorSelector);
  const { control, handleSubmit } = useForm<LoginValues>();

  useFocusEffect(useCallback(() => {
    if (isSucceed) {
      dispatch(authActions.clearIsSucceed());
      navigation.navigate(Screen.MAIN);
    }
  }, [isSucceed]));

  useFocusEffect(useCallback(() => {
    if (error) {
      Alert.alert(error.title, error.message, [{
          text: 'Retry',
          onPress: () => {
            dispatch(authActions.clearError());
          }
        }]
      );
    }
  }, [error]));

  const onSubmit: SubmitHandler<LoginValues> = data => {
    dispatch(loginThunk(data));
  };

  const controllersErrorMessage = 'The field can not be empty';

  return (
    <AuthLayout title={Screen.LOGIN}>
      <FormController
        label="Username"
        name="username"
        errorMessage={controllersErrorMessage}
        control={control}
        rules={{ required: true }}
        style={styles.loginFormControllerUsername}
      />
      <FormController
        secureTextEntry
        label="Password"
        name="password"
        errorMessage={controllersErrorMessage}
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
