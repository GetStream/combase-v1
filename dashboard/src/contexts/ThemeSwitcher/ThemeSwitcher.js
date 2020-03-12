import React, { useCallback, useMemo, useState } from "react";
import { ThemeProvider } from "styled-components";
import ThemeSwitcherContext from "./index";

import * as themes from "styles/theme";

export default ({ children }) => {
  const [currentTheme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );
  
  const [overrides, setOverrides] = useState(JSON.parse(localStorage.getItem('themeOverrides')) || {});

  const toggleTheme = useCallback(() => {
    const newTheme = currentTheme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  }, [currentTheme]);

  const updateOverrides = useCallback(values => {
    localStorage.setItem('themeOverrides', JSON.stringify(values));
    console.log('setting overrides', values);
    setOverrides(values);
  }, []);

  const value = useMemo(
    () => ({
      isDarkMode: currentTheme === "dark",
      toggleTheme,
      updateOverrides,
    }),
    [toggleTheme, currentTheme, updateOverrides]
  );
  
  const theme = useMemo(() => themes[currentTheme](overrides), [currentTheme, overrides]);

  return (
    <ThemeSwitcherContext.Provider {...{ value }}>
      <ThemeProvider {...{theme}}>{children}</ThemeProvider>
    </ThemeSwitcherContext.Provider>
  );
};
