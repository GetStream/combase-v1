import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Container } from '@comba.se/ui';

// Contexts //
import { ScrollAnimationProvider } from 'contexts/ScrollAnimation';

// Components //
import Header from 'components/Home/Header';
import ConversationsWidget from 'components/Home/ConversationsWidget';
import KnowledgeBaseWidget from 'components/Home/KnowledgeBaseWidget';

const Root = styled.div`
    flex: 1;
    width: 100%;
    overflow: scroll;
`;

const Content = styled(Container)`
    z-index: 2;
    flex: 1 0 2000px;
    margin-top: 280px;

    & > * + * {
        margin-top: 24px;
    }
`;

const Home = () => {
    const [rootRef, setRootRef] = useState();
    
    const ref = useCallback((el) =>{
        if (el && !rootRef) {
            setRootRef(el);
        }
    }, [rootRef]);

    return (
        <ScrollAnimationProvider target={rootRef}>
            <Root {...{ref}}>
                <Header />
                <Content>
                    <ConversationsWidget />
                    <KnowledgeBaseWidget />
                </Content>
            </Root>
        </ScrollAnimationProvider>
    );
};

export default Home;