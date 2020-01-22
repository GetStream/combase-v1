import React from "react";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";

// Data //
import routes from "./routes";

// HOCs //
import withShell from "hocs/withShell";

// Components //
const Root = styled.div`
  flex: 1;
`;

const renderRoutes = match =>
  routes.map(({ path, component, isExact }) => (
    <Route {...{ component, isExact }} path={`${match.url}${path}`} />
  ));

const Dashboard = ({ match }) => {
  return <Switch>{renderRoutes(match)}</Switch>;
};

export default withShell(Dashboard, routes);
