import React from "react";
import styled from "styled-components";

// Components ///
import ScreenRoot from "components/ScreenRoot";

const Root = styled(ScreenRoot)`
  flex: 1;
`;
export default () => (
  <Root>
    <p>Settings</p>
  </Root>
);
