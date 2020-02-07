import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// CSS //
import listItemInteractions from 'styles/css/listItemInteractions';

// Components //
import Text from 'shared/Text';

const Root = styled.button`
    padding: 12px 24px;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    border-radius: ${({ theme }) => theme.borderRadius}px;
    align-items: center;
    justify-content: center;
    box-shadow: ${({ color, disabled, flat, theme }) =>
        !disabled && !flat
            ? `0px 1px 4px ${theme.colorUtils.fade(
                  theme.colorUtils.darken(theme.color[color], 0.1),
                  0.4
              )}`
            : null};
    background-color: ${({ disabled, flat, color, theme }) =>
        flat
            ? 'transparent'
            : disabled
            ? theme.color.disabled
            : theme.color[color]};
    ${({ color, disabled, flat, theme }) =>
        !disabled
            ? flat
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
    `
            : null};

    & > ${Text} {
        margin-left: ${({ hasIcon }) => (hasIcon ? 8 : 0)}px;
    }
`;

const Button = ({
    className,
    color,
    disabled,
    icon: Icon,
    flat,
    label,
    onClick,
    type,
}) => {
    return (
        <Root
            activeColor={color}
            hasIcon={!!Icon}
            onClick={!disabled ? onClick : null}
            {...{ className, color, disabled, flat, type }}
        >
            {Icon ? <Icon color={flat ? color : 'surface'} /> : null}
            <Text color={flat ? color : 'surface'}>{label}</Text>
        </Root>
    );
};

Button.propTypes = {
    color: PropTypes.string,
    disabled: PropTypes.bool,
    icon: PropTypes.func,
    flat: PropTypes.bool,
    label: PropTypes.string,
    onClick: PropTypes.func,
};

Button.defaultProps = {
    color: 'primary',
    type: 'button',
};

export default Button;
