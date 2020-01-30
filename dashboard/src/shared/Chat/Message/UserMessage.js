import React, { memo } from 'react';
import styled from 'styled-components';

// HOCs //
import asMessage from '../hocs/asMessage';

// Components //
import Text from 'shared/Text';

const Root = styled.div`
    padding: 20px;
    background-color: ${({ theme }) => theme.color.surface};
    border: 1px solid ${({ theme }) => theme.color.border};
    border-top-left-radius: ${({ theme }) => theme.borderRadius * 2}px;
    border-top-right-radius: ${({ hasPrev, theme }) =>
        hasPrev ? theme.borderRadius : theme.borderRadius * 2}px;
    border-bottom-left-radius: ${({ theme }) => theme.borderRadius * 2}px;
    border-bottom-right-radius: ${({ hasNext, theme }) =>
        hasNext ? theme.borderRadius : theme.borderRadius * 2}px;
    margin-left: 64px;
    @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
        margin-left: 160px;
    }
`;

const UserMessage = memo(({ currentMessage: { text }, hasNext, hasPrev }) => {
    return (
        <Root {...{ hasNext, hasPrev }}>
            <Text color="alt_text">{text}</Text>
        </Root>
    );
});

export default asMessage(UserMessage);
