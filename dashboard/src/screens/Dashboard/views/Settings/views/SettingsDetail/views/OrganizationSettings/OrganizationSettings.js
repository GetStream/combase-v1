import React from "react";
import styled from "styled-components";
import { Container } from '@comba.se/ui';
import { OrganizationSettingsIcon } from "@comba.se/ui/dist/Icons";

// Forms //
import { OrganizationProfileForm, OrganizationChatSettingsForm } from 'screens/Dashboard/forms/OrganizationSettings';

// Hooks //
import useMedia from 'hooks/useMedia';

// Components //
import ListHeader from 'shared/ListHeader';

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
