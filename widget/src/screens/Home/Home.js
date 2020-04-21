import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import Animated from 'animated/lib/targets/react-dom';
import { Card, Container } from '@comba.se/ui';

// Contexts //
import { useAuth } from 'contexts/Auth';
import { useScrollAnim } from 'contexts/ScrollAnimation';

// Components //
import ConversationsWidget from 'components/ConversationsWidget';

const Root = styled(Container)`
    z-index: 2;
    margin-top: 200px;
    padding-bottom: 40px;

    & > * + * {
        margin-top: 24px;
    }
`;

const Home = () => {
    const { user } = useAuth();
    const { setScrollAnim } = useScrollAnim();

    useEffect(() => {
        setScrollAnim({ value: 0 })
    }, [setScrollAnim]);

    if (user._id === '!anon') {
        return <Redirect to="/new" />
    }

    return (
        <Root>
            <ConversationsWidget />
            <Card style={{ height: 400 }} />
        </Root>
    );
};

export default ({ transitionAnim, ...props }) => {
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

    return (
        <Animated.div style={style}>
            <Home {...props} />
        </Animated.div>
    );
};