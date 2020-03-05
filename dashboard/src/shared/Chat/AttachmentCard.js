import React from 'react';
import styled from 'styled-components';

// Components //
const Root = styled.div`
    width: 88px;
    border-radius: ${({ theme }) => theme.borderRadius / 2}px;
    overflow: hidden;

    & + & {
        margin-left: 16px;
    }

    & > img {
        width: 100%;
        object-fit: cover;
    }
`;

export default ({ className, type, thumb_url }) => {
    return (
        <Root {...{ className }}>
            <img src={thumb_url} alt="attachment" />
        </Root>
    )
};