import React from "react";

// Styles //
import { ThemeProvider } from "styled-components";
import theme from "styles/theme";
import GlobalStyles from "styles/global";

function App() {
  return (
    <ThemeProvider {...{ theme }}>
      <>
        <div>Hello</div>
        <GlobalStyles />
      </>
    </ThemeProvider>
  );
}

export default App;
