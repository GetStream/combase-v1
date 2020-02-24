import { addDecorator } from "@storybook/react";
import { withThemesProvider } from "storybook-addon-styled-component-theme";
import { dark, light } from 'styles/theme';

const themes = [light, dark];
addDecorator(withThemesProvider(themes))