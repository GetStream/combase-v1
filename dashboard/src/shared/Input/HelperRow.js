import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';
import { Text } from '@comba.se/ui';

import usePrevious from 'hooks/usePrevious';

// Components //
const Root = styled.div`
    height: 16px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    padding: 2px 0px;
`;

const Content = styled.div`
    flex: 1;
    height: 12px;
    justify-content: center;

    & > div {
        position: absolute;
        top: 0;
        left: 16px;
        flex: 1;
    }
`;

const HelperRow = ({ error, helperText }) => {
    const prevError = usePrevious(error);
    const anim = useSpring({
        value: error ? 1 : 0,
        config: { mass: 1, tension: 500, friction: 30 },
    });
    const errorStyle = useMemo(
        () => ({
            opacity: anim.value,
            transform: anim.value
                .interpolate({
                    range: [0, 1],
                    output: ['-100%', '0%'],
                })
                .interpolate(v => `translate3d(0, ${v}, 0)`),
        }),
        [anim.value]
    );

    const helperStyle = useMemo(
        () => ({
            opacity: anim.value.interpolate({
                range: [0, 1],
                output: [1, 0],
            }),
            transform: anim.value
                .interpolate({
                    range: [0, 1],
                    output: ['0%', '100%'],
                })
                .interpolate(v => `translate3d(0, ${v}, 0)`),
        }),
        [anim.value]
    );

    return (
        <Root>
            <Content>
                <animated.div style={errorStyle}>
                    <Text size={12} line={12} color="error" weight="500">
                        {error || prevError}
                    </Text>
                </animated.div>
                {helperText ? (
                    <animated.div style={helperStyle}>
                        <Text
                            size={12}
                            line={12}
                            weight="500"
                            color="alt_text"
                            faded
                        >
                            {helperText}
                        </Text>
                    </animated.div>
                ) : null}
            </Content>
        </Root>
    );
};

HelperRow.propTypes = {
    error: PropTypes.string,
    helperText: PropTypes.string,
};

export default HelperRow;
