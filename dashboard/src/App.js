import React from "react";
import moment from "moment";

// Router //
import { Router, Switch } from "react-router-dom";
import history from "utils/history";

// Styles //
import { ThemeSwitcher } from 'contexts/ThemeSwitcher';
import { light } from 'styles/theme';
import GlobalStyles from "styles/global";

// Context //
import AuthProvider from "contexts/Auth/AuthProvider";
import SnackbarProvider from "contexts/Snackbar/SnackbarProvider";

// Screens //
import Auth from "screens/Auth";
import Dashboard from "screens/Dashboard";
import Welcome from "screens/Welcome";

// Components //
import AuthedRoute from "components/AuthedRoute";
import OrgProtectedRoute from "components/OrgProtectedRoute";
import UnauthedRoute from "components/UnauthedRoute";

moment.updateLocale("en", {
  calendar: {
    lastDay: "[Yesterday at] h:mma",
    sameDay: "h:mma",
    nextDay: "[Tomorrow at] h:mma",
    lastWeek: "MMMM Do YYYY",
    nextWeek: "MMMM Do YYYY",
    sameElse: "L"
  }
});

function App() {
  return (
    <ThemeSwitcher>
      <SnackbarProvider>
        <AuthProvider>
          <Router {...{ history }}>
            <Switch>
              <OrgProtectedRoute path="/welcome" component={Welcome} />
              <UnauthedRoute path="/auth" component={Auth} />
              <AuthedRoute path="/" component={Dashboard} />
            </Switch>
          </Router>
          <GlobalStyles />
        </AuthProvider>
      </SnackbarProvider>
    </ThemeSwitcher>
  );
}

export default App;
