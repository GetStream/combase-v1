import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { LoadingState } from "@comba.se/ui";
import useAuth from 'hooks/useAuth';

export default ({ component: Component, ...rest }) => {
    const [{ organization }, { loading }] = useAuth();
    return (
        <Route
            {...rest}
            children={props => {
                if (loading) {
                    return <LoadingState key="loading" />;
                } else if (organization) {
                    return <Redirect replace to="/auth/login" />;
                }
                return <Component {...props} />;
            }}
        />
    );
};
