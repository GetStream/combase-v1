import React, { useContext } from "react";
import styled from "styled-components";
import { Container, ListHeader } from "@comba.se/ui";
import { Col, Grid, Row } from '@comba.se/ui/Grid';
import { AppSettingsIcon, SoundsIcon, ThemeIcon } from "@comba.se/ui/Icons";

// Hooks //
import useMedia from 'hooks/useMedia';

// Contexts //
import ThemeSwitcherContext from "contexts/ThemeSwitcher";
import ShellContext from "contexts/Shell";

// Components //
import MenuButton from 'shared/MenuButton';
import Switch from "components/Switch";
import SettingsListItem from "components/SettingsListItem";

const Root = styled.div`
  flex: 1;
`;

const AppSettings = () => {
  const isMobile = useMedia('sm');
  const { isDarkMode, toggleTheme } = useContext(ThemeSwitcherContext);
  const { sounds } = useContext(ShellContext);
  return (
    <Root>
      <Container noPadding maxWidth={640}>
        {!isMobile ? <ListHeader bgColor="surface" leftButtonElement={MenuButton} showSearch={false} icon={AppSettingsIcon} title="App Settings" /> : null}
        <Grid fluid>
          <Row>
            <Col>
              <SettingsListItem
                icon={ThemeIcon}
                color="text"
                title="Dark Mode"
                text="Toggle the UI theme of Combase."
              >
                <Switch checked={isDarkMode} onChange={toggleTheme} />
              </SettingsListItem>
            </Col>
          </Row>
          <Row>
            <Col>
              <SettingsListItem
                icon={SoundsIcon}
                color="yellow"
                title="App Sounds"
                text="Toggle the Notification & UI sounds."
              >
                <Switch checked={sounds.enabled} onChange={sounds.toggle} />
              </SettingsListItem>
            </Col>
          </Row>
        </Grid>
      </Container>
    </Root>
  );
};

export default AppSettings;
