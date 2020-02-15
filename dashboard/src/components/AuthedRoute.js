import React from "react";
import { Route, Redirect } from "react-router-dom";
import LoadingState from "shared/LoadingState";
import useAuth from "hooks/useAuth";
import OrganizationCard from "./OrganizationCard";

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
