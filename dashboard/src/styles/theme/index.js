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
    light_text: colors.light_gray,
    shadow: colors.black,
    border: colors.light_gray,
    text: colors.black,
    alt_text: colors.slate,
    undersheet: baseTheme.colorUtils.fade(colors.black, 0.4)
  }
};
