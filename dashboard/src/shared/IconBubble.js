import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Components //
const Root = styled.div`
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;
    background-color: ${({ color, theme }) => theme.color[color]};
    justify-content: center;
    align-items: center;
    border-radius: 50%;
`;

const IconBubble = ({ color, icon: Icon, iconColor, size }) => {
    return (
        <Root {...{ color, size }}>
            {Icon ? <Icon color={iconColor} size={size / 2} /> : null}
        </Root>
    );
};

IconBubble.propTypes = {
    color: PropTypes.string,
    icon: PropTypes.func,
    iconColor: PropTypes.string,
    size: PropTypes.number,
};

IconBubble.defaultProps = {
    color: 'primary',
    iconColor: 'surface',
    size: 56,
};

export default IconBubble;
