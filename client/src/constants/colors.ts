import { LinearGradientProps } from 'react-native-linear-gradient';

enum Colors {
  MAIN_WHITE = '#FFFFFF',
  GREY_BLACK5 = '#F9F9FA',
  GREY_BLACK10 = '#EBEBEB',
  GREY_BLACK20 = '#BFC4C9',
  GREY_BLACK40 = '#A7A7A7',
  MAIN_DARK = '#363636',
  MAIN_RED = '#F42C4F'
}

export const ORANGE_LINEAR_GRADIENT_PROPS: LinearGradientProps = {
  colors: ['#F9D423', '#F83600'],
  start: { x: -1.9776, y: 0 },
  end: { x: 1.5351, y: 0 }
};

export default Colors;
