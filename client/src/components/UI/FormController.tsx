import { useState } from 'react';
import { StyleProp, StyleSheet, TextInput, View, ViewStyle } from 'react-native';
import { FieldValues, useController, UseControllerProps } from 'react-hook-form';
import Animated, { FadeIn, FadeInDown, FadeOut, FadeOutDown } from 'react-native-reanimated';

import Color from '../../constants/color';
import Font from '../../constants/font';

interface FormControllerProps<T extends FieldValues> extends UseControllerProps<T> {
  secureTextEntry?: boolean;
  label: string;
  errorMessage?: string;
  style?: StyleProp<ViewStyle>;
}

function FormController<T extends FieldValues>({
                                                 secureTextEntry,
                                                 name,
                                                 label,
                                                 errorMessage,
                                                 control,
                                                 rules,
                                                 style
                                               }: FormControllerProps<T>): JSX.Element {
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
      isLabelVisible && styles.formControllerOpened,
      invalid && styles.formControllerInvalid,
      style
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
        secureTextEntry={secureTextEntry}
        value={value}
        placeholder={isPlaceholderVisible ? label : ''}
        placeholderTextColor={Color.MAIN_DARK}
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
    backgroundColor: Color.GREY_BLACK5,
    paddingVertical: 19,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: Color.GREY_BLACK20,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    marginBottom: 48
  },
  formControllerOpened: {
    paddingTop: 6,
    paddingBottom: 12
  },
  formControllerInvalid: {
    borderColor: Color.MAIN_RED
  },
  fontControllerLabel: {
    color: Color.GREY_BLACK40,
    fontFamily: Font.MONTSERRAT_MEDIUM,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.2,
    marginBottom: 4
  },
  formControllerInput: {
    fontFamily: Font.MONTSERRAT_REGULAR,
    letterSpacing: 0.1
  },
  formControllerHint: {
    color: Color.MAIN_RED,
    fontFamily: Font.MONTSERRAT_MEDIUM,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.2,
    position: 'absolute',
    left: 12,
    bottom: -18
  }
});

export default FormController;
