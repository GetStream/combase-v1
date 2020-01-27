import React, { useContext } from "react";
import styled from "styled-components";

// Contexts //
import ShellContext from "contexts/Shell";

// Components //
import { MenuIcon } from 'shared/Icons';
import IconButton from 'shared/IconButton';

const Root = styled(IconButton)`
  margin-right: 16px;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
    display: none;
  }
`;

const MenuButton = props => {
  const { drawer } = useContext(ShellContext);
  return <Root {...props} onClick={drawer.toggle} icon={MenuIcon} color="text" size={24} />;
};

export default MenuButton;
