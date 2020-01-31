import React, { memo } from 'react';
import styled from 'styled-components';

// HOCs //
import asMessage from '../hocs/asMessage';

// Components //
import Text from 'shared/Text';
import StatusIcon from '../StatusIcon';

const Root = styled.div`
    flex-direction: row;
    z-index: 0;
`;

const StatusCol = styled.div`
    width: 16px;
    margin-left: 8px;
    justify-content: flex-end;
    margin-bottom: 4px;
`;

const Bubble = styled.div`
    padding: 20px;
    background-color: ${({ theme }) => theme.color.surface};
    border: 1px solid ${({ theme }) => theme.color.border};
    border-top-left-radius: ${({ theme }) => theme.borderRadius * 2}px;
    border-top-right-radius: ${({ hasPrev, theme }) =>
        hasPrev ? theme.borderRadius : theme.borderRadius * 2}px;
    border-bottom-left-radius: ${({ theme }) => theme.borderRadius * 2}px;
    border-bottom-right-radius: ${({ hasNext, theme }) =>
        hasNext ? theme.borderRadius : theme.borderRadius * 2}px;
    margin-left: 24px;
    @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
        margin-left: 160px;
    }
`;

const UserMessage = memo(({ currentMessage: { text }, hasNext, hasPrev, partner, ...rest }) => {
    return (
        <Root>
            <Bubble {...{ hasNext, hasPrev }}>
                <Text line={24} color="alt_text">{text}</Text>
            </Bubble>
            <StatusCol>
                <StatusIcon {...{partner}} status="delivered" />
            </StatusCol>
        </Root>
    );
});

export default asMessage(UserMessage);