import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';

// Components //
import Portal from 'shared/Portal';
import { AddIcon } from 'shared/Icons';

const Root = styled(animated.button)`
    position: absolute;
    bottom: 32px;
    right: 32px;
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
    background-color: ${({ color, disabled, theme }) => theme.color[disabled ? "disabled" : color]};
    box-shadow: 0px 8px 16px
        ${({ color, disabled, theme }) => theme.colorUtils.fade(theme.color[disabled ? "disabled" : color], 0.56)};
`;

const FAB = ({
    className,
    color,
    disabled,
    disablePortal,
    icon: Icon,
    onClick,
    size,
}) => {
    const [hovered, setHovered] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [active, setActive] = useState(false);
    const anim = useSpring({
        value: !mounted ? 0 : hovered && !active ? 1.1 : 1,
        config: {
            tension: 200,
            friction: 18,
        },
    });

    const style = {
        transform: anim.value.interpolate(value => `scale(${value})`),
    };

    return (
        <Portal onRendered={() => setMounted(true)} disable={disablePortal}>
            <Root
                {...{ className, color, disabled, onClick, size, style }}
                onMouseEnter={() => !disabled ? setHovered(true): null}
                onMouseLeave={() => !disabled ? setHovered(false): null}
                onMouseDown={() => !disabled ? setActive(true): null}
                onMouseUp={() => !disabled ? setActive(false): null}
            >
                <Icon color="white" size={size / 2} />
            </Root>
        </Portal>
    );
};

FAB.propTypes = {
    color: PropTypes.string,
    disabled: PropTypes.bool,
    icon: PropTypes.func,
    type: PropTypes.oneOf(['button', 'submit']),
    size: PropTypes.number,
};

FAB.defaultProps = {
    color: 'primary',
    icon: AddIcon,
    type: 'button',
    size: 56,
};

export default FAB;
