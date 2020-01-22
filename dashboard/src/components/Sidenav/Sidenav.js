import React from "react";
import styled from "styled-components";

// Components //
import SidenavItem from "./SidenavItem";

const Root = styled.div`
  width: 96px;
  background-color: ${({ theme }) => theme.color.background};
`;

const Brand = styled.div`
  justify-content: center;
  align-items: center;
  padding: 24px 0px;
`;

const Logo = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.gray};
`;

const Menu = styled.div`
  flex: 1;
  width: 100%;
  margin-top: 24px;
`;

const renderItems = (routes, match) =>
  routes.map(({ component, ...route }) => (
    <SidenavItem {...route} path={`${match.url}${route.path}`} />
  ));

export default ({ match, routes }) => {
  return (
    <Root>
      <Brand>
        <Logo />
      </Brand>
      <Menu>{renderItems(routes, match)}</Menu>
    </Root>
  );
};
