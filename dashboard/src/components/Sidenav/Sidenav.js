import React from "react";
import styled from "styled-components";

// Components //
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
  padding-top: 48px;
`;

export default () => {
  return (
    <Root>
      <Brand>
        <Logo />
      </Brand>
      <Menu></Menu>
    </Root>
  );
};
