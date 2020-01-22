import React from "react";

// Router //
import { Route, Router, Switch } from "react-router-dom";
import history from "utils/history";

// Styles //
import { ThemeProvider } from "styled-components";
import theme from "styles/theme";
import GlobalStyles from "styles/global";

// Screens //
import Dashboard from "screens/Dashboard";

function App() {
  return (
    <ThemeProvider {...{ theme }}>
      <>
        <Router {...{ history }}>
          <Switch>
            <Route path="/" component={Dashboard} />
          </Switch>
        </Router>
        <GlobalStyles />
      </>
    </ThemeProvider>
  );
}

export default App;
