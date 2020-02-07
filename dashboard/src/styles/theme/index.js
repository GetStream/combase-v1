import colors from './colors';
import baseTheme from './base';

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
    },
};

export const dark = {
    ...baseTheme,
    color: {
        ...colors,
        primary: colors.blue,
        background: colors.black,
        surface: colors.true_black,
        error: colors.red,
        disabled: colors.gray,
        light_text: colors.white,
        shadow: colors.black,
        border: colors.slate,
        text: colors.gray,
        alt_text: colors.slate,
        undersheet: baseTheme.colorUtils.fade(colors.black, 0.64),
    },
};
