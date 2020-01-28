import { css } from "styled-components";

/*
 * Used for hover & active states of a list item component
 * Falls back to the theme's primary color
 * Optionally pass an 'activeColor' prop with the key name of a color from your theme to customize
 */

export default css`
  background-color: ${({ active, activeColor = "text", theme }) =>
    theme.colorUtils.fade(theme.color[activeColor], active ? 0.04 : 0)};
  transition: 0.24s background-color
    ${({ theme }) => theme.easing.css(theme.easing.standard)};

  &:hover {
    background-color: ${({ activeColor = "text", theme }) =>
      theme.colorUtils.fade(theme.color[activeColor], 0.04)};
  }

  &:active {
    background-color: ${({ activeColor = "text", theme }) =>
      theme.colorUtils.fade(theme.color[activeColor], 0.08)};
  }
`;
