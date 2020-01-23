/*
 * Header.js
 * Only used on mobile & tablet screen sizes
 */

import React, { useContext } from "react";
import styled from "styled-components";

// Contexts //
import ShellContext from "contexts/Shell";

// Components //
const Root = styled.div`
  height: 64px;
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding: 0px 16px;
`;

const Icon = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.gray};
`;

const Logo = styled(Icon)`
  width: 40px;
  height: 40px;
`;

export default () => {
  const { drawer } = useContext(ShellContext);
  console.log(drawer.open);
  return (
    <Root>
      <Icon onClick={drawer.toggle} />
      <Logo />
      <Icon />
    </Root>
  );
};
