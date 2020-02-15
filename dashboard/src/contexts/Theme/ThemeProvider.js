import React, { useMemo, useState } from "react";
import { ThemeProvider } from "styled-components";
import ThemeSwitcherContext from "./index";

import * as themes from "styles/theme";

export default ({ children }) => {
  const [currentTheme, setTheme] = useState("light");
  const value = useMemo(
    () => ({
      setTheme
    }),
    [setTheme]
  );
  return (
    <ThemeSwitcherContext.Provider {...{ value }}>
      <ThemeProvider theme={themes[currentTheme]}>{children}</ThemeProvider>
    </ThemeSwitcherContext.Provider>
  );
};
