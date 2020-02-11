import React from 'react';
import styled from 'styled-components';

// Components //
const Root = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 376px;
    background-color: ${({ theme }) => theme.color.surface};
    border-left: 1px solid ${({ theme }) => theme.color.border};
    transform: translateX(${({ open }) => (open ? 0 : 100)}%);
`;

const SideDrawer = ({ open }) => {
    return <Root {...{ open }}></Root>;
};

export default SideDrawer;
