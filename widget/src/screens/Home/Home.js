import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import Animated from 'animated/lib/targets/react-dom';
import { Container } from '@comba.se/ui';

// Contexts //
import { useScrollAnim } from 'contexts/ScrollAnimation';

// Components //
import ConversationsWidget from 'components/Home/ConversationsWidget';

const Root = styled(Container)`
    z-index: 2;
    margin-top: 200px;
    padding-bottom: 40px;

    & > * + * {
        margin-top: 24px;
    }
`;

const Home = ({ transitionAnim }) => {
    const { setScrollAnim } = useScrollAnim();
    const style = useMemo(() => ({
        transform: [
            {
                translateY: transitionAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%'],
                    extrapolate: 'clamp'
                })
            },
        ],
        zIndex: 1
    }), [transitionAnim]);

    useEffect(() => {
        setScrollAnim({ value: 0 })
    }, [setScrollAnim]);

    return (
        <Animated.div style={style}>
            <Root>
                <ConversationsWidget />
                <ConversationsWidget />
            </Root>
        </Animated.div>
    );
};

export default Home;