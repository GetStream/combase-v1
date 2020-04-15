import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Container } from '@comba.se/ui';

// Contexts //
import { ScrollAnimationProvider } from 'contexts/ScrollAnimation';

// Components //
import ConversationsWidget from 'components/Home/ConversationsWidget';

const Root = styled(Container)`
    z-index: 2;
    margin-top: 280px;
    padding-bottom: 40px;

    & > * + * {
        margin-top: 24px;
    }
`;

const Home = () => {
    const [rootRef, setRootRef] = useState();

    const ref = useCallback((el) => {
        if (el && !rootRef) {
            setRootRef(el);
        }
    }, [rootRef]);

    return (
        <Root>
            <ConversationsWidget />
            <ConversationsWidget />
        </Root>
    );
};

export default Home;