import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Components //
import Portal from 'shared/Portal';
import { AddIcon } from 'shared/Icons';

const Root = styled.div`
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;
    background-color: ${({ color, theme }) => theme.color[color]};
`;

const FAB = ({ color, disablePortal, icon: Icon, onClick, size }) => (
    <Portal disable={disablePortal}>
        <Root {...{ color, onClick, size }}>
            <Icon size={size / 2} />
        </Root>
    </Portal>
)

FAB.propTypes = {
    color: "primary",
    icon: AddIcon,
    size: 56,
};

FAB.defaultProps = {
    color: PropTypes.string,
    icon: PropType.func,
    size: PropTypes.number,
};

export default FAB;
