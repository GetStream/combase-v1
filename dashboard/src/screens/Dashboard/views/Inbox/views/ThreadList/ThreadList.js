import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// Components //
const Root = styled.div`
  flex: 1;
  order: -1;
  height: 100%;
  background-color: ${({ theme }) => theme.color.background};

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
    flex: 0 0 375px;
  }
`;

export default ({ match }) => {
  return (
    <Root>
      <p>Thread List</p>
      <Link to={`${match.url}/channelId`}>Nick Parsons</Link>
    </Root>
  );
};
