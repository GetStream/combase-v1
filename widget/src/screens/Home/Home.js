import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import Animated from 'animated/lib/targets/react-dom';
import { Container } from '@comba.se/ui';

// Contexts //
import { ScrollAnimationProvider } from 'contexts/ScrollAnimation';

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
    const [rootRef, setRootRef] = useState();

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
    }), [transitionAnim])

    const ref = useCallback((el) => {
        if (el && !rootRef) {
            setRootRef(el);
        }
    }, [rootRef]);

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