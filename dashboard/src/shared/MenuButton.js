import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { IconButton } from '@comba.se/ui';
import { MenuIcon } from "@comba.se/ui/Icons";

// Contexts //
import ShellContext from 'contexts/Shell';

// Components //
const Root = styled(IconButton)`
    @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
        display: none;
    }
`;

const MenuButton = props => {
    const { drawer } = useContext(ShellContext);
    return (
        <Root
            {...props}
            onClick={drawer.toggle}
            icon={MenuIcon}
            color={props.color}
            size={24}
        />
    );
};

MenuButton.propTypes = {
    color: PropTypes.string,
};

MenuButton.defaultProps = {
    color: 'text',
};

export default MenuButton;
