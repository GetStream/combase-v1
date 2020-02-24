import React from "react";
import styled from "styled-components";

// Forms //
import OrganizationSettingsForm from 'screens/Dashboard/forms/OrganizationSettingsForn';

// Components //
import Container from "shared/Container";

const Root = styled.div`
  flex: 1;
`;

const OrganizationSettings = () => {
  return (
    <Root>
      <Container maxWidth={640}>
        <OrganizationSettingsForm />
      </Container>
    </Root>
  );
};

export default OrganizationSettings;
