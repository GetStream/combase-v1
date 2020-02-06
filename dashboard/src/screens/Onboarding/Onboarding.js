import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// Views //
import Login from './views/Login';

const redirectToLogin = () => <Redirect replace to="/auth/login" />;

const Onboarding = ({ match }) => {
    return (
        <Switch>
            <Route path={`${match.url}/login`} component={Login} />
            <Route path={match.url} children={redirectToLogin} />
        </Switch>
    );
};

export default Onboarding;
