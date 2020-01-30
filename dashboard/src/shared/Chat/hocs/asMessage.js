import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
    max-width: 840px;
    width: 100%;
    align-self: center;
`;

const Container = styled.div`
    flex-direction: row;
    align-items: flex-end;
    justify-content: ${({ pos }) =>
        pos === 'left' ? 'flex-end' : 'flex-start'};
    margin-right: ${({ pos }) => (pos === 'left' ? 0 : 8)}px;
    margin-left: ${({ pos }) => (pos === 'left' ? 8 : 0)}px;
    margin-bottom: ${({ hasNext }) => (hasNext ? 2 : 24)}px;
`;

const MessageWrapper = styled.div`
    flex: 1;
    align-items: ${({ pos }) => (pos === 'left' ? 'flex-start' : 'flex-end')};
`;

export default WrappedComponent => props => {
    const { hasNext, position } = props;
    return (
        <Root>
            <Container pos={position} {...{ hasNext }}>
                <MessageWrapper pos={position}>
                    <WrappedComponent {...props} />
                </MessageWrapper>
            </Container>
        </Root>
    );
};
