import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';

import * as themes from 'styles/theme';

export default ({ children }) => {
    const [currentTheme, setTheme] = useState('light');
    return (
        <ThemeProvider theme={themes[currentTheme]}>{children}</ThemeProvider>
    );
};
