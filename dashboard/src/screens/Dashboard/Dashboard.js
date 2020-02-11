import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Data //
import routes from './routes';

// HOCs //
import withShell from 'hocs/withShell';

const renderRoutes = match =>
    routes.map(({ slug, component, isExact }, key) => (
        <Route {...{ component, isExact, key }} path={`${match.url}${slug}`} />
    ));

const Dashboard = ({ match }) => {
    return <Switch>{renderRoutes(match)}</Switch>;
};

export default withShell(Dashboard, routes);
