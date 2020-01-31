import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// CSS //
import listItemInteractions from 'styles/css/listItemInteractions';

// Components //
import Text from 'shared/Text';

const Root = styled.button`
    padding: 12px 24px;
    cursor: pointer;
    border-radius: ${({ theme }) => theme.borderRadius}px;
    background-color: ${({ flat, color, theme }) =>
        flat ? 'transparent' : theme.color[color]};
    ${({ color, flat, theme }) =>
        flat
            ? listItemInteractions
            : `
            transition: 0.24s background-color ${theme.easing.css(
                theme.easing.standard
            )};
        &:hover {
            background-color: ${theme.colorUtils.darken(
                theme.color[color],
                0.05
            )}
        }
        &:active {
            background-color: ${theme.colorUtils.darken(
                theme.color[color],
                0.15
            )}
        }
    `};
`;

const Button = ({ color, flat, label, onClick }) => {
    return (
        <Root activeColor={color} {...{ color, flat, onClick }}>
            <Text color={flat ? color : 'surface'}>{label}</Text>
        </Root>
    );
};

Button.propTypes = {
    color: PropTypes.string,
    flat: PropTypes.bool,
    label: PropTypes.string,
    onClick: PropTypes.func,
};

Button.defaultProps = {
    color: 'primary',
};

export default Button;
