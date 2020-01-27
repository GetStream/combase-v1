import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';

// Components //
import Portal from 'shared/Portal';
import { AddIcon } from 'shared/Icons';

const Root = styled(animated.div)`
    position: absolute;
    bottom: 32px;
    right: 32px;
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: ${({ color, theme }) => theme.color[color]};
    box-shadow: 0px 8px 16px ${({ color, theme }) => theme.colorUtils.fade(theme.color[color], .56)};
`;

const FAB = ({ color, disablePortal, icon: Icon, onClick, size }) => {
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
        transform: anim.value
            .interpolate(value => `scale(${value})`),
    };

    return (
        <Portal onRendered={() => setMounted(true)} disable={disablePortal}>
            <Root {...{ color, onClick, size, style }} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onMouseDown={() => setActive(true)} onMouseUp={() => setActive(false)}>
                <Icon color="white" size={size / 2} />
            </Root>
        </Portal>
    );  
}

FAB.propTypes = {
    color: PropTypes.string,
    icon: PropTypes.func,
    size: PropTypes.number,
};

FAB.defaultProps = {
    color: "primary",
    icon: AddIcon,
    size: 56,
};


export default FAB;
