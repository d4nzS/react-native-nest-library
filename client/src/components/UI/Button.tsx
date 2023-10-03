import { FC, PropsWithChildren } from 'react';
import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Font from '../../constants/font';
import Color, { ORANGE_LINEAR_GRADIENT_PROPS } from '../../constants/color';

export enum ButtonStyle {
  PRIMARY,
  SECONDARY
}

interface ButtonProps extends PropsWithChildren {
  buttonStyle?: ButtonStyle;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
}

const Button: FC<ButtonProps> = ({
                                   buttonStyle = ButtonStyle.PRIMARY,
                                   disabled = false,
                                   style,
                                   onPress,
                                   children
                                 }) => {
  const pressHandler = (): void => {
    onPress();
  };

  return (
    <Pressable style={style} onPress={pressHandler}>
      <LinearGradient
        {...ORANGE_LINEAR_GRADIENT_PROPS}
        colors={disabled || buttonStyle === ButtonStyle.SECONDARY
          ? ['transparent', 'transparent']
          : ORANGE_LINEAR_GRADIENT_PROPS.colors}
        style={[
          styles.button,
          buttonStyle === ButtonStyle.SECONDARY && styles.buttonSecondary,
          disabled && styles.buttonDisabled
        ]}
      >
        <Text style={[
          styles.buttonText,
          buttonStyle === ButtonStyle.SECONDARY && styles.buttonTextSecondary
        ]}>
          {children}
        </Text>
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 20
  },
  buttonSecondary: {
    backgroundColor: Color.MAIN_WHITE,
    borderWidth: 1,
    borderColor: Color.GREY_BLACK20,
    borderStyle: 'solid'
  },
  buttonDisabled: {
    backgroundColor: Color.GREY_BLACK10
  },
  buttonText: {
    color: Color.MAIN_WHITE,
    fontFamily: Font.MONTSERRAT_SEMI_BOLD,
    fontSize: 12,
    letterSpacing: 0.2,
    textTransform: 'uppercase'
  },
  buttonTextSecondary: {
    color: Color.MAIN_DARK
  }
});

export default Button;
