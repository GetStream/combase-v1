import colors from "./colors";
import baseTheme from "./base";

export const light = {
  ...baseTheme,
  color: {
    ...colors,
    primary: colors.blue,
    background: colors.off_white,
    surface: colors.white,
    error: colors.red,
    disabled: colors.gray,
    light_text: colors.light_gray,
    shadow: colors.black,
    border: colors.light_gray,
    text: colors.black,
    alt_text: colors.slate,
    undersheet: baseTheme.colorUtils.fade(colors.black, 0.64),
    placeholder: colors.light_gray,
    placeholder_shimmer: baseTheme.colorUtils.lighten(colors.light_gray, .64),
  }
};

export const dark = {
  ...baseTheme,
  color: {
    ...colors,
    primary: colors.blue,
    background: baseTheme.colorUtils.darken(colors.black, 0.2),
    surface: colors.black,
    error: colors.red,
    disabled: colors.gray,
    light_text: baseTheme.colorUtils.fade(colors.white, 0.32),
    shadow: colors.black,
    border: baseTheme.colorUtils.fade(colors.white, 0.05),
    text: colors.white,
    alt_text: baseTheme.colorUtils.fade(colors.white, 0.8),
    undersheet: baseTheme.colorUtils.fade(colors.black, 0.64),
    placeholder: baseTheme.colorUtils.darken(colors.black, .2),
    placeholder_shimmer: baseTheme.colorUtils.darken(colors.black, .1),
  }
};
