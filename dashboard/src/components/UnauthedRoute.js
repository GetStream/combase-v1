import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import LoadingState from 'shared/LoadingState';
import useAuth from 'hooks/useAuth';

export default ({ component: Component, ...rest }) => {
    const [{ organization, user }, { loading }] = useAuth();
    return (
        <Route
            {...rest}
            children={props => {
                if (loading) {
                    return <LoadingState key="loading" />;
                } else if (!organization) {
                    return <Redirect replace to="/welcome" />;
                } else if (!!user) {
                    return <Redirect replace to="/inbox" />;
                }
                return <Component {...props} />;
            }}
        />
    );
};
