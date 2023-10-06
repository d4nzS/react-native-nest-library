import { FC, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { SubmitHandler, useForm } from 'react-hook-form';

import MainLayout from '../MainLayout';
import Font from '../../../constants/font';
import Color from '../../../constants/color';
import FormController from '../../UI/FormController';
import { PASSWORD_MIN_LENGTH, validationPatterns } from '../../../constants/validation';
import Button, { ButtonStyle } from '../../UI/Button';
import RegistrationValues from '../../../interfaces/registration-values';
import useAppSelector from '../../../hooks/use-app-selector';
import userSelectors from '../../../store/user/user-selectors';

const Profile: FC = () => {
  const {
    control,
    setValue,
    getValues,
    handleSubmit
  } = useForm<RegistrationValues>({
    mode: 'onSubmit'
  });
  const currentUser = useAppSelector(userSelectors.currentUserSelector);
  const [areControllersEnabled, setAreControllersEnabled] = useState<boolean>(false);

  useEffect(() => {
    if (currentUser) {
      setValue('username', currentUser.username);
      setValue('email', currentUser.email);
    }
  }, [currentUser]);

  const toggleEditCredentialsPermissionHandler = (): void => {
    setAreControllersEnabled(prevState => !prevState);
  };

  const onSubmit: SubmitHandler<RegistrationValues> = data => {
    console.log(data);
  };

  return (
    <MainLayout>
      <ScrollView>
        <Text style={styles.profileTitle}>Account credentials</Text>
        <Text style={styles.profileHint}>You can edit your information here</Text>
        <FormController
          editable={areControllersEnabled}
          label="Username"
          errorMessage="Use Latin alphabet and numbers"
          name="username"
          control={control}
          rules={{
            required: true,
            pattern: validationPatterns.USERNAME_PATTERN
          }}
        />
        <FormController
          editable={areControllersEnabled}
          label="Email"
          errorMessage="Please enter a valid email"
          name="email"
          control={control}
          rules={{
            pattern: validationPatterns.EMAIL_PATTERN
          }}
        />
        <FormController
          editable={areControllersEnabled}
          secureTextEntry
          label="Password"
          errorMessage="Password must be at least 8 characters"
          name="password"
          control={control}
          rules={{
            minLength: PASSWORD_MIN_LENGTH
          }}
        />
        <FormController
          editable={areControllersEnabled}
          secureTextEntry
          label="Confirm password"
          errorMessage="Passwords must match"
          name="confirmPassword"
          control={control}
          rules={{
            validate: () => getValues().password === getValues().confirmPassword
          }}
        />
        <Button
          buttonStyle={ButtonStyle.SECONDARY}
          style={styles.profileEditButton}
          onPress={toggleEditCredentialsPermissionHandler}
        >
          Edit
        </Button>
        <Button
          disabled={!areControllersEnabled}
          onPress={handleSubmit(onSubmit)}
        >
          Save Changes
        </Button>
      </ScrollView>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  profileTitle: {
    color: Color.MAIN_DARK,
    fontFamily: Font.MONTSERRAT_BOLD,
    fontSize: 18,
    lineHeight: 28,
    marginBottom: 8
  },
  profileHint: {
    color: Color.GREY_BLACK40,
    fontFamily: Font.MONTSERRAT_REGULAR,
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 12
  },
  profileEditButton: {
    marginBottom: 16
  }
});

export default Profile;
