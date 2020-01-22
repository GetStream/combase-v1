import React from "react";
import styled from "styled-components";
import { Link, Route } from "react-router-dom";

// Components //
const Root = styled.div`
  justify-content: center;
  align-items: center;
  padding: 24px 0px;
`;

const Icon = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${({ active, theme }) =>
    theme.color[active ? "primary" : "gray"]};
`;

export default ({ isExact, path }) => {
  return (
    <Route
      {...{ path, isExact }}
      children={({ match: active }) => (
        <Link to={path}>
          <Root>
            <Icon {...{ active }} />
          </Root>
        </Link>
      )}
    />
  );
};
