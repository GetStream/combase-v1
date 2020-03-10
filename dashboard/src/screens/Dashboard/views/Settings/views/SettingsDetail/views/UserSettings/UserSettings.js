import React from "react";
import styled from "styled-components";
import { Container, ListHeader } from '@comba.se/ui';
import { UserSettingsIcon } from "@comba.se/ui/Icons";

// Hooks //
import useMedia from 'hooks/useMedia';

// Forms //
import { UserAvailabilityForm, UserProfileForm } from 'screens/Dashboard/forms/UserSettings';

// Components //
import MenuButton from 'shared/MenuButton';

const Root = styled.div`
  flex: 1;
`;

const UserSettings = () => {
  const isMobile = useMedia('sm');
  return (
    <Root>
      <Container noPadding maxWidth={640}>
        {!isMobile ? <ListHeader bgColor="surface" leftButtonElement={MenuButton} showSearch={false} icon={UserSettingsIcon} title="User Settings" /> : null}
        <UserProfileForm />
        <UserAvailabilityForm />
      </Container>
    </Root>
  );
};

export default UserSettings;
