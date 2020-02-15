import React, { useContext } from "react";
import styled from "styled-components";

// Contexts //
import ThemeSwitcherContext from "contexts/Theme";

// Components //
import { ThemeIcon } from "shared/Icons";
import Container from "shared/Container";
import Switch from "components/Switch";
import SettingsListItem from "components/SettingsListItem";

const Root = styled.div`
  flex: 1;
`;

const AppSettings = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeSwitcherContext);
  return (
    <Root>
      <Container maxWidth={640}>
        <SettingsListItem
          icon={ThemeIcon}
          color="text"
          title="Dark Mode"
          text="Toggle the UI theme of Combase."
        >
          <Switch color="text" checked={isDarkMode} onChange={toggleTheme} />
        </SettingsListItem>
      </Container>
    </Root>
  );
};

export default AppSettings;
