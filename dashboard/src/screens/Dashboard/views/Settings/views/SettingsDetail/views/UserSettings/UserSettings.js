import React from "react";
import styled from "styled-components";

// Hooks //
import useMedia from 'hooks/useMedia';

// Forms //
import { UserAvailabilityForm, UserProfileForm } from 'screens/Dashboard/forms/UserSettings';

// Components //
import Container from "shared/Container";
import ListHeader from 'shared/ListHeader';
import { UserSettingsIcon } from 'shared/Icons';

const Root = styled.div`
  flex: 1;
`;

const UserSettings = () => {
  const isMobile = useMedia('sm');
  return (
    <Root>
      <Container noPadding maxWidth={640}>
        {!isMobile ? <ListHeader bgColor="surface" showSearch={false} icon={UserSettingsIcon} title="User Settings" /> : null}
        <UserProfileForm />
        <UserAvailabilityForm />
      </Container>
    </Root>
  );
};

export default UserSettings;
