import React, { memo } from 'react';
import styled from 'styled-components';

// HOCs //
import asMessage from '../hocs/asMessage';

// Components //
import Text from 'shared/Text';

const Root = styled.div`
    padding: 20px;
    background-color: ${({ theme }) => theme.color.primary};
    border: 1px solid ${({ theme }) => theme.color.primary};
    border-top-left-radius: ${({ theme }) => theme.borderRadius * 2}px;
    border-top-right-radius: ${({ theme }) => theme.borderRadius * 2}px;
    border-bottom-left-radius: ${({ theme }) => theme.borderRadius * 2}px;
    border-bottom-right-radius: ${({ theme }) => theme.borderRadius * 2}px;
    margin-right: 64px;
    @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
        margin-right: 160px;
    }
`;

const PartnerMessage = memo(({ currentMessage: { text } }) => {
    return (
        <Root>
            <Text color="white">{text}</Text>
        </Root>
    );
});

export default asMessage(PartnerMessage);
