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
    box-shadow: -4px 0px 24px rgba(0, 0, 0, 0.12);
    border-top-left-radius: ${({ theme }) => theme.borderRadius}px;
    border-bottom-left-radius: ${({ theme }) => theme.borderRadius}px;
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
