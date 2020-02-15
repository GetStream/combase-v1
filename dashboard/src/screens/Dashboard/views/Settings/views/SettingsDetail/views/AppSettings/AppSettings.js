import React from "react";
import styled from "styled-components";

// Components //
import { ThemeIcon } from "shared/Icons";
import Container from "shared/Container";
import Switch from "components/Switch";
import SettingsListItem from "components/SettingsListItem";

const Root = styled.div`
  flex: 1;
`;

const AppSettings = () => {
  return (
    <Root>
      <Container maxWidth={640}>
        <SettingsListItem
          icon={ThemeIcon}
          color="text"
          title="Dark Mode"
          text="Toggle the UI theme of Combase."
        >
          <Switch color="text" />
        </SettingsListItem>
      </Container>
    </Root>
  );
};

export default AppSettings;
