import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { animated as Animated, useSpring } from 'react-spring';

// Components //
const Root = styled.svg`
    width: ${ ({ size }) => size}px;
    height: ${ ({ size }) => size}px;
    fill: none;
    transform: rotate(180deg) scaleX(-1);

    & text {
        user-select: none;
        text-anchor: middle;
        transform: translate(9px,43px) rotate(-180deg) scaleX(-1)
    }
`;

const CircularProgress = ({ animated, color, value, theme, ...props }) => {
    const [animate, setAnimate] = useState(false);
    useEffect(() => {
        if (animated) {
            setTimeout(() => {
                setAnimate(true);
            }, 1000);
        }
    }, [animate, animated]);
    const { value: anim } = useSpring({ value: animated ? animate ? 1 : 0 : 1, config: { mass: 8, tension: 500, friction: 80 } });
    const { value: textAnim } = useSpring({ value: animated ? animate ? 1 : 0 : 1, config: { mass: 8, tension: 500, friction: 80, clamp: true } });
    const style = {
        opacity: anim.interpolate({
            range: [0, 0.0000001],
            output: [0, 1]
        }),
        strokeDasharray: anim.interpolate({
            range: [0, 1],
            output: [0, value]
        }).interpolate(v => `${v}, 100000`),
    };
    const countValue = animated ? textAnim.interpolate({
        range: [0, 1],
        output: [0, value],
    }).interpolate(v => Math.floor(v)) : value;
    const textStyle = animated ? {
        opacity: anim.interpolate({
            range: [0, 0.0000001],
            output: [0, 1]
        }),
    } : {};
    return (
        <Root color="transparent" viewBox="0 0 40 40" {...props} {...{ value }}>
            <g>
                <circle stroke={theme.color.text} strokeWidth="4" opacity="0.04" cx="20" cy="20" r="16" />
                <Animated.path {...{ style }} d="M20,36 C28.836556,36 36,28.836556 36,20 C36,11.163444 28.836556,4 20,4 C11.163444,4 4,11.163444 4,20 C4,28.836556 11.163444,36 20,36 Z" stroke={theme.color[color]} strokeWidth="4" strokeLinecap="round" />
                <Animated.text style={textStyle} fontFamily="CircularStd-Medium, Circular Std" fontSize="12" fontWeight="400" lineSpacing="12" fill={theme.color[color]}>
                    <Animated.tspan x="11" y="27">{countValue}</Animated.tspan>
                </Animated.text>
            </g>
        </Root>
    );
}

CircularProgress.propTypes = {
    animated: PropTypes.bool,
    color: PropTypes.string,
    size: PropTypes.number,
    value: PropTypes.number.isRequired,
};

CircularProgress.defaultProps = {
    animated: false,
    color: "primary",
    size: 40,
}

export default withTheme(CircularProgress);