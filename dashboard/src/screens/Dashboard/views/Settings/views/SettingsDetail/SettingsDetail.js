import React from "react";
import styled from "styled-components";
import { Switch, Route } from "react-router-dom";

// CSS //
import pageCard from "styles/css/pageCard";

// Hooks //
import useMedia from 'hooks/useMedia';

// Views //
import AppSettings from "./views/AppSettings";
import UserSettings from "./views/UserSettings";
import OrganizationSettings from "./views/OrganizationSettings";

// Components //
import MobileHeader from 'components/MobileHeader';
import EmptyState from "shared/EmptyState";

const Root = styled.div`
  flex: 1;
  z-index: 2;
  background-color: ${({ theme }) => theme.color.surface};
  -webkit-overflow-scroll: touch;
  padding-bottom: 32px;
  overflow-y: scroll !important;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
    ${pageCard}
  }
`;

const EmptyWrapper = styled.div`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const renderEmptyState = () => (
  <EmptyWrapper>
    <EmptyState text="Settings" />
  </EmptyWrapper>
);

const returnTitle = () => (
  <Switch>
    <Route path="/settings/app" render={() => 'App Settings'} />
    <Route path="/settings/user" render={() => 'User Settings'} />
    <Route path="/settings/organization" render={() => 'Organization Settings'} />
    <Route path="/settings" render={() => 'Settings'} />
  </Switch>
);

export default ({ history, match }) => {
  const isMobile = useMedia('sm');
  return (
    <Root>
      {isMobile ? (
        <MobileHeader showBackBtn={match.isExact} onBackClick={history.goBack} title={returnTitle()} />
      ) : null}
      <Switch>
        <Route
          path="/settings/organization"
          component={OrganizationSettings}
        />
        <Route path="/settings/user" component={UserSettings} />
        <Route path="/settings/app" component={AppSettings} />
        <Route path="/settings" render={renderEmptyState} />
      </Switch>
    </Root>
  );
};
