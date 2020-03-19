import React, { useCallback, useContext } from "react";
import styled from "styled-components";
import { Container, ListHeader } from "@comba.se/ui";
import { Col, Grid, Row } from '@comba.se/ui/Grid';
import { AppSettingsIcon, SoundsIcon, ThemeIcon } from "@comba.se/ui/Icons";
import { useSnackbar } from 'contexts/Snackbar';

// Utils //
import request from "utils/request";

// Hooks //
import useMedia from 'hooks/useMedia';
import useAuth from 'hooks/useAuth';

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
  const [{ user }, { refetchUser }] = useAuth();
  const { queueSnackbar } = useSnackbar();
  const { isDarkMode, setTheme } = useContext(ThemeSwitcherContext);
  const { sounds } = useContext(ShellContext);

  const handleChangeTheme = useCallback(async () => {
    try {
      const newTheme = isDarkMode ? 'light' : 'dark';
      setTheme(newTheme);
      await request(`v1/agents/${user._id}`, 'put', {
        body: JSON.stringify({
          meta: {
            ...user.meta,
            theme: newTheme
          }
        }),
      });
      await refetchUser();
      queueSnackbar({
        isError: false,
        replace: true,
        text: "Theme Updated! 🎨"
      });
    } catch (error) {
      queueSnackbar({
        isError: true,
        text: error.message
      })
    }
  }, [isDarkMode]);

  const handleChangeSounds = useCallback(async () => {
    try {
      const soundsEnabled = !sounds.enabled;
      sounds.toggle();
      await request(`v1/agents/${user._id}`, 'put', {
        body: JSON.stringify({
          meta: {
            ...user.meta,
            sounds: soundsEnabled
          }
        }),
      });
      await refetchUser();
      queueSnackbar({
        isError: false,
        replace: true,
        text: "Sounds Preferences Updated! 🔈"
      });
    } catch (error) {
      queueSnackbar({
        isError: true,
        text: error.message
      })
    }
  }, [sounds]);

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
                <Switch checked={isDarkMode} onChange={handleChangeTheme} />
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
                <Switch checked={sounds.enabled} onChange={handleChangeSounds} />
              </SettingsListItem>
            </Col>
          </Row>
        </Grid>
      </Container>
    </Root>
  );
};

export default AppSettings;
