import React from "react";

// Styles //
import { ThemeProvider } from "styled-components";
import theme from "styles/theme";

function App() {
  return (
    <ThemeProvider {...{ theme }}>
      <p>Comba</p>
    </ThemeProvider>
  );
}

export default App;
