import React from "react";

// Router //
import { BrowserRouter as Router, Route } from "react-router-dom";

// Styles //
import { ThemeProvider } from "styled-components";
import theme from "styles/theme";
import GlobalStyles from "styles/global";

// Screens //
import Home from "screens/Home";

function App() {
  return (
    <ThemeProvider {...{ theme }}>
      <>
        <Router>
          <Route path="/" component={Home} />
        </Router>
        <GlobalStyles />
      </>
    </ThemeProvider>
  );
}

export default App;
