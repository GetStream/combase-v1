import React from "react";
import styled from "styled-components";

// Forms //
import OrganizationSettingsForm from 'screens/Dashboard/forms/OrganizationSettingsForn';

// Hooks //
import useAuth from 'hooks/useAuth';

// Components //
import Container from "shared/Container";

const Root = styled.div`
  flex: 1;
`;

const Organization = () => {
  const [{ organization }] = useAuth();
  console.log(organization);
  return (
    <Root>
      <Container maxWidth={640}>
        <OrganizationSettingsForm />
      </Container>
    </Root>
  );
};

export default Organization;
