import { FC, PropsWithChildren } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Font from '../../constants/font';
import Color, { ORANGE_LINEAR_GRADIENT_PROPS } from '../../constants/color';

interface ButtonProps extends PropsWithChildren {
  disabled?: boolean;
  onPress: () => void;
}

const Button: FC<ButtonProps> = ({
                                   disabled = false,
                                   onPress,
                                   children
                                 }) => {
  const pressHandler = (): void => {
    onPress();
  };

  return (
    <Pressable onPress={pressHandler}>
      <LinearGradient
        {...ORANGE_LINEAR_GRADIENT_PROPS}
        colors={disabled
          ? [Color.GREY_BLACK10, Color.GREY_BLACK10]
          : ORANGE_LINEAR_GRADIENT_PROPS.colors}
        style={styles.button}
      >
        <Text style={styles.buttonText}>{children}</Text>
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
  buttonText: {
    color: Color.MAIN_WHITE,
    fontFamily: Font.MONTSERRAT_SEMI_BOLD,
    fontSize: 12,
    letterSpacing: 0.2,
    textTransform: 'uppercase'
  }
});

export default Button;
