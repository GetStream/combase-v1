import React, { useContext } from "react";
import styled from "styled-components";

// Contexts //
import ThemeSwitcherContext from "contexts/Theme";
import ShellContext from "contexts/Shell";

// Components //
import { SoundsIcon, ThemeIcon } from "shared/Icons";
import Container from "shared/Container";
import Switch from "components/Switch";
import SettingsListItem from "components/SettingsListItem";

const Root = styled.div`
  flex: 1;
`;

const AppSettings = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeSwitcherContext);
  const { sounds } = useContext(ShellContext);
  return (
    <Root>
      <Container maxWidth={640}>
        <SettingsListItem
          icon={ThemeIcon}
          color="text"
          title="Dark Mode"
          text="Toggle the UI theme of Combase."
        >
          <Switch checked={isDarkMode} onChange={toggleTheme} />
        </SettingsListItem>
        <SettingsListItem
          icon={SoundsIcon}
          color="yellow"
          title="App Sounds"
          text="Toggle the Notification & UI sounds."
        >
          <Switch checked={sounds.enabled} onChange={sounds.toggle} />
        </SettingsListItem>
      </Container>
    </Root>
  );
};

export default AppSettings;
