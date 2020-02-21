import React from "react";
import { Route, Switch } from "react-router-dom";

// Data //
import routes from "./routes";

// Hooks //
import useNotifications from 'hooks/useNotifications';

// HOCs //
import withShell from "hocs/withShell";

const renderRoutes = match =>
  routes.map(({ slug, component, isExact }, key) => (
    <Route {...{ component, isExact, key }} path={`${match.url}${slug}`} />
  ));

const Dashboard = ({ match }) => {
  useNotifications(); // Triggers Notification Sounds & Snackbars.
  return <Switch>{renderRoutes(match)}</Switch>;
};

export default withShell(Dashboard, routes);
