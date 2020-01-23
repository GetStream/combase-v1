import React from "react";
import styled from "styled-components";

// Components //
import ListHeader from "components/ListHeader";
import SettingsItem from "components/SettingsItem";

const Root = styled.div`
  flex: 1;
  order: -1;
  height: 100%;
  background-color: ${({ theme }) => theme.color.background};

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
    flex: 0 0 375px;
  }
`;

export default () => (
  <Root>
    <ListHeader showSearch={false} title="Settings" />
    <SettingsItem
      title="App Settings"
      text="Toggle dark mode, change default message sounds and other app-level
          settings."
    />
    <SettingsItem title="User Settings" text="Change your profile information, password and user preferences" />
    <SettingsItem title="Organization Settings" text="Change your organization profile, welcome message, color palette, branding and more" />
  </Root>
);
