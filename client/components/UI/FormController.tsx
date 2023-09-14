import { FC, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Control, FieldValues, useController } from 'react-hook-form';
import Animated, { FadeIn, FadeInDown, FadeOut, FadeOutDown } from 'react-native-reanimated';

import Colors from '../../constants/colors';
import Fonts from '../../constants/fonts';

interface FormControllerProps {
  name: string;
  label: string;
  control: Control;
  rules?: Object;
  errorMessage?: string;
}

const FormController: FC<FormControllerProps> = ({
                                                   name,
                                                   label,
                                                   control,
                                                   rules,
                                                   errorMessage
                                                 }) => {
  const {
    field: { value, onChange },
    fieldState: { invalid }
  } = useController({
    name,
    control,
    rules
  });
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const focusTextInputHandler = (): void => {
    setIsFocused(true);
  };

  const blurTextInputHandler = (): void => {
    setIsFocused(false);
  };

  const isLabelVisible = Boolean(isFocused || value);
  const isPlaceholderVisible = !isLabelVisible;

  return (
    <View style={[
      styles.formController,
      isLabelVisible && styles.formControllerOpened
    ]}>
      {isLabelVisible && (
        <Animated.Text
          entering={FadeInDown}
          exiting={FadeOutDown}
          style={styles.fontControllerLabel}
        >
          {label}
        </Animated.Text>
      )}
      <TextInput
        value={value}
        placeholder={isPlaceholderVisible ? label : ''}
        style={styles.formControllerInput}
        onChangeText={onChange}
        onFocus={focusTextInputHandler}
        onBlur={blurTextInputHandler}
      />
      {invalid && (
        <Animated.Text
          entering={FadeIn}
          exiting={FadeOut}
          style={styles.formControllerHint}
        >
          {errorMessage}
        </Animated.Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formController: {
    backgroundColor: Colors.GREY_BLACK5,
    paddingVertical: 19,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.GREY_BLACK20,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    marginVertical: 36
  },
  formControllerOpened: {
    paddingTop: 6,
    paddingBottom: 12
  },
  fontControllerLabel: {
    color: Colors.GREY_BLACK40,
    fontFamily: Fonts.MONTSERRAT_MEDIUM,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.2
  },
  formControllerInput: {
    fontFamily: Fonts.MONTSERRAT_MEDIUM,
    letterSpacing: 0.1,
    marginTop: 4
  },
  formControllerHint: {
    color: Colors.MAIN_RED,
    fontFamily: Fonts.MONTSERRAT_MEDIUM,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.2,
    position: 'absolute',
    left: 12,
    bottom: -18
  }
});

export default FormController;
