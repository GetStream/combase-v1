import React from "react";
import styled from "styled-components";

// Forms //
import UserSettingsForm from 'screens/Dashboard/forms/UserSettingsForm';

// Components //
import Container from "shared/Container";
import Text from "shared/Text";

const Root = styled.div`
  flex: 1;
`;

const UserSettings = () => {
  return (
    <Root>
      <Container noPadding maxWidth={640}>
        <UserSettingsForm />
      </Container>
    </Root>
  );
};

export default UserSettings;
