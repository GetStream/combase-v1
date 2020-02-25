import React from "react";
import styled from "styled-components";

// Forms //
import OrganizationSettingsForm from 'screens/Dashboard/forms/OrganizationSettingsForn';

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
        <OrganizationSettingsForm />
      </Container>
    </Root>
  );
};

export default OrganizationSettings;
