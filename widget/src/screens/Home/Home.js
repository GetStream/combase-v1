import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Container } from '@comba.se/ui';

// Contexts //
import { ScrollAnimationProvider } from 'contexts/ScrollAnimation';

// Components //
const Root = styled.div`
    flex: 1;
    width: 100%;
`;

const Content = styled(Container)`
    z-index: 2;
    padding-bottom: 40px;
    margin-top: 280px;

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
        <Content>

        </Content>
    );
};

export default Home;