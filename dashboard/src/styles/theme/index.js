import colors from "./colors";
import baseTheme from "./base";

export default {
  ...baseTheme,
  color: {
    ...colors,
    primary: colors.blue,
    background: colors.off_white,
    surface: colors.white,
    error: colors.red,
    shadow: colors.black,
    border: colors.light_gray,
    text: colors.black
  }
};
