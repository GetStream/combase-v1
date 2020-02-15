import React, { useCallback, useMemo, useState } from "react";
import { ThemeProvider } from "styled-components";
import ThemeSwitcherContext from "./index";

import * as themes from "styles/theme";

export default ({ children }) => {
  const [currentTheme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );
  const toggleTheme = useCallback(() => {
    const newTheme = currentTheme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  }, [currentTheme]);
  const value = useMemo(
    () => ({
      isDarkMode: currentTheme === "dark",
      toggleTheme
    }),
    [toggleTheme, currentTheme]
  );
  return (
    <ThemeSwitcherContext.Provider {...{ value }}>
      <ThemeProvider theme={themes[currentTheme]}>{children}</ThemeProvider>
    </ThemeSwitcherContext.Provider>
  );
};
