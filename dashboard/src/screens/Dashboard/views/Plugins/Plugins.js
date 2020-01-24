import React from "react";
import styled from "styled-components";

// Components ///
import { PluginsIcon } from "shared/Icons";
import ScreenRoot from "shared/ScreenRoot";
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
    <FullScreenHeader icon={PluginsIcon} />
    <Container>
      <PluginsList />
    </Container>
  </Root>
);
