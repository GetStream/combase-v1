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
    align-items: center;
    justify-content: center;
    box-shadow: ${({ flat }) =>
        !flat ? '0px 1px 4px rgba(0, 0, 0, 0.12)' : null};
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

const Button = ({ className, color, flat, label, onClick, type }) => {
    return (
        <Root
            activeColor={color}
            {...{ className, color, flat, onClick, type }}
        >
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
    type: 'button',
};

export default Button;
