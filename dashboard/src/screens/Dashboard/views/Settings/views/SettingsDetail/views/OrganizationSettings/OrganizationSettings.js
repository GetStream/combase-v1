import React from "react";
import styled from "styled-components";

// Components //
import Container from "shared/Container";
import Text from "shared/Text";

const Root = styled.div`
  flex: 1;
`;

const Organization = () => {
  return (
    <Root>
      <Container maxWidth={640}>
        <Text>Organization Settings</Text>
      </Container>
    </Root>
  );
};

export default Organization;
