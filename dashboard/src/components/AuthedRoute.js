import React from "react";
import { Route, Redirect } from "react-router-dom";
import { LoadingState } from "@comba.se/ui";
import useAuth from "hooks/useAuth";

export default ({ component: Component, ...rest }) => {
  const [{ user }, { loading }] = useAuth();
  return (
    <Route
      {...rest}
      children={props => {
        if (loading) {
          return <LoadingState key="loading" />;
        } else if (!!user) {
          return <Component {...props} />;
        }
        return (
          <Redirect
            replace
            to={{
              pathname: "/auth/login",
              state: { next: props.location }
            }}
          />
        );
      }}
    />
  );
};
