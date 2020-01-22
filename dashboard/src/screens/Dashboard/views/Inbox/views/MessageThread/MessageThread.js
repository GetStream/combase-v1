import React from "react";
import styled from "styled-components";

// CSS //
import pageCard from "styles/css/pageCard";

// Components //
const Root = styled.div`
  flex: 1;
  z-index: 2;
  background-color: ${({ theme }) => theme.color.surface};

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
    ${pageCard}
  }
`;

export default () => {
  return <Root>Messages</Root>;
};
