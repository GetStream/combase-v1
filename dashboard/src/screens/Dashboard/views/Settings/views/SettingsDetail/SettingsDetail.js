import React from "react";
import styled from "styled-components";
import { Switch, Route } from "react-router-dom";

// CSS //
import pageCard from "styles/css/pageCard";

// Views //
import AppSettings from "./views/AppSettings";
import UserSettings from "./views/UserSettings";
import OrganizationSettings from "./views/OrganizationSettings";

// Components //
import EmptyState from "shared/EmptyState";

const Root = styled.div`
  flex: 1;
  z-index: 2;
  background-color: ${({ theme }) => theme.color.surface};

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
    ${pageCard}
  }
`;

const renderEmptyState = () => <EmptyState text="Settings" />;

export default ({ match }) => {
  return (
    <Root>
      <Switch>
        <Route
          path={`${match.url}/organization`}
          component={OrganizationSettings}
        />
        <Route path={`${match.url}/user`} component={UserSettings} />
        <Route path={`${match.url}/app`} component={AppSettings} />
        <Route path={match.url} render={renderEmptyState} />
      </Switch>
    </Root>
  );
};
