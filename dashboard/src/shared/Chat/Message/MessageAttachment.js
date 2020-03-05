import React from 'react';
import styled from 'styled-components';

// Components //
const Root = styled.div`
    background-color: ${({ theme }) => theme.color.surface};
    border: 1px solid ${({ theme }) => theme.color.border};
    border-top-left-radius: ${({ theme }) => theme.borderRadius * 2}px;
    border-top-right-radius: ${({ hasPrev, theme }) =>
        hasPrev ? theme.borderRadius : theme.borderRadius * 2}px;
    border-bottom-left-radius: ${({ theme }) => theme.borderRadius * 2}px;
    border-bottom-right-radius: ${({ hasNext, theme }) => theme.borderRadius}px;
    max-width: 640px;
    overflow: hidden;
    & > img {
        width: 100%;
    }
`;

const MessageAttachment = ({ asset_url, hasNext, hasPrev }) => {
    return (
        <Root {...{ hasNext, hasPrev }}>
            <img src={asset_url} alt="attachment" />
        </Root>
    )
};

export default MessageAttachment;