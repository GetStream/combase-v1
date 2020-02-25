import React from "react";
import styled from "styled-components";

// Components //
import {
  AppSettingsIcon,
  OrganizationSettingsIcon,
  SettingsIcon,
  UserSettingsIcon
} from "shared/Icons";
import ListHeader from "shared/ListHeader";
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
    <ListHeader showSearch={false} icon={SettingsIcon} title="Settings" />
    <SettingsItem
      icon={AppSettingsIcon}
      title="App Settings"
      text="Toggle dark mode, change default message sounds and other app-level
          settings."
      to={`${match.url}/app`}
    />
    <SettingsItem
      icon={UserSettingsIcon}
      title="User Settings"
      text="Change your profile information, password and user preferences"
      to={`${match.url}/user`}
    />
    <SettingsItem
      icon={OrganizationSettingsIcon}
      title="Organization Settings"
      text="Change your organization profile, welcome message, color palette, branding and more"
      to={`${match.url}/organization`}
    />
  </Root>
);
