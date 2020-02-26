import React from "react";
import styled from "styled-components";

// Forms //
import { OrganizationProfileForm, OrganizationChatSettingsForm } from 'screens/Dashboard/forms/OrganizationSettings';

// Hooks //
import useMedia from 'hooks/useMedia';

// Components //
import Container from "shared/Container";
import ListHeader from 'shared/ListHeader';
import { OrganizationSettingsIcon } from 'shared/Icons';

const Root = styled.div`
  flex: 1;
`;

const OrganizationSettings = () => {
  const isMobile = useMedia('sm');
  return (
    <Root>
      <Container noPadding maxWidth={640}>
        {!isMobile ? <ListHeader bgColor="surface" showSearch={false} icon={OrganizationSettingsIcon} title="Organization Settings" /> : null}
        <OrganizationProfileForm />
        <OrganizationChatSettingsForm />
      </Container>
    </Root>
  );
};

export default OrganizationSettings;
