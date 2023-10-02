import { FC } from 'react';
import { StyleSheet, Text } from 'react-native';
import { useForm } from 'react-hook-form';

import MainLayout from '../MainLayout';
import Font from '../../../constants/font';
import Color from '../../../constants/color';
import FormController from '../../UI/FormController';
import validationPatterns from '../../../constants/validation-patterns';
import Button from '../../UI/Button';

const Profile: FC = () => {
  const { control } = useForm({
    mode: 'onChange'
  });

  return (
    <MainLayout>
      <Text style={styles.profileTitle}>Account credentials</Text>
      <Text style={styles.profileHint}>You can edit your information here</Text>
      <FormController
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
        label="Email"
        errorMessage="Please enter a valid email"
        name="email"
        control={control}
        rules={{
          required: true,
          pattern: validationPatterns.EMAIL_PATTERN
        }}
      />
      <FormController
        label="Password"
        name="password"
        control={control}
        rules={{
          required: true,
          minLength: 8
        }}
      />
      <Button onPress={() => {}}>
        Save Changes
      </Button>
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
  }
});

export default Profile;
