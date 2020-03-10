import React from "react";
import styled from "styled-components";
import { Route } from 'react-router-dom';
import { ListHeader } from '@comba.se/ui';
import {
  AppSettingsIcon,
  OrganizationSettingsIcon,
  SettingsIcon,
  UserSettingsIcon
} from "@comba.se/ui/Icons";

// Components //
import MenuButton from 'shared/MenuButton';
import SettingsItem from "./components/SettingsItem";

const Root = styled.div`
  flex: 1;
  order: -1;
  height: 100%;
  background-color: ${({ theme }) => theme.color.background};

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
    flex: 0 0 375px;
  }
`;

export default ({ match }) => (
  <Root>
    <ListHeader leftButtonElement={MenuButton} showSearch={false} icon={SettingsIcon} title="Settings" />
    <Route path={`${match.url}/app`} children={({ match: active }) => {
      return (
        <SettingsItem
          {...{active}}
          icon={AppSettingsIcon}
          title="App Settings"
          text="Toggle dark mode, change default message sounds and other app-level
              settings."
          to={`${match.url}/app`}
        />
      )
    }} />
    <Route path={`${match.url}/user`} children={({ match: active }) => {
      return (
        <SettingsItem
          {...{active}}
          icon={UserSettingsIcon}
          title="User Settings"
          text="Change your profile information, password and user preferences"
          to={`${match.url}/user`}
        />
      )
    }} />
    <Route path={`${match.url}/organization`} children={({ match: active }) => {
      return (
        <SettingsItem
        {...{active}}
          icon={OrganizationSettingsIcon}
          title="Organization Settings"
          text="Change your organization profile, welcome message, color palette, branding and more"
          to={`${match.url}/organization`}
        />
      )
    }} />
  </Root>
);
