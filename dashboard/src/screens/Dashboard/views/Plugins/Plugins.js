import React from "react";
import styled from "styled-components";

// Components ///
import ScreenRoot from "shared/ScreenRoot";
import Card from "shared/Card";
import Container from "shared/Container";
import FullScreenHeader from "components/FullScreenHeader";
import PluginsList from "components/PluginsList";

const Root = styled(ScreenRoot)`
  flex: 1;
  overflow-y: scroll;
  padding-bottom: 40px;
`;

export default () => (
  <Root>
    <FullScreenHeader />
    <Container>
      <PluginsList />
    </Container>
  </Root>
);
