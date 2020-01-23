import React, { useContext } from "react";
import styled from "styled-components";

// Contexts //
import ShellContext from "contexts/Shell";

const Root = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.light_gray};
`;

const MenuButton = props => {
  const { drawer } = useContext(ShellContext);
  return <Root {...props} onClick={drawer.toggle} />;
};

export default MenuButton;
