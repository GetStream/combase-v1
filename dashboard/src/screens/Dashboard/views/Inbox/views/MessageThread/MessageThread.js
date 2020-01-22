import React from "react";
import styled from "styled-components";

// Components //
const Root = styled.div`
  flex: 1;
  z-index: 2;
  background-color: ${({ theme }) => theme.color.surface};

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
    box-shadow: -4px 0px 24px rgba(0, 0, 0, 0.12);
    border-top-left-radius: ${({ theme }) => theme.borderRadius}px;
    border-bottom-left-radius: ${({ theme }) => theme.borderRadius}px;
  }
`;

export default () => {
  return <Root>Messages</Root>;
};
