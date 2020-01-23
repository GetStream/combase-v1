import React from "react";
import styled from "styled-components";

// Components //
import ListHeader from "components/ListHeader";

const Root = styled.div`
  flex: 1;
  order: -1;
  height: 100%;
  background-color: ${({ theme }) => theme.color.background};

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
    flex: 0 0 375px;
  }
`;

export default () => (
  <Root>
    <ListHeader showSearch={false} title="Settings" />
  </Root>
);
