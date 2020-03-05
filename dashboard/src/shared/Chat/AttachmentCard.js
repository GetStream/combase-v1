import React, { useCallback } from 'react';
import styled from 'styled-components';
import { CancelIcon } from '@comba.se/ui/Icons';

// Components //
const DeleteBtn = styled.button`
    position: absolute;
    top: -16px;
    right: -16px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    height: 32px;
    width: 32px;
    cursor: pointer;
    background-color: ${({ theme }) => theme.color.surface};
    transform: scale(0);
    transition: .3s transform ${({ theme }) => theme.easing.css(theme.easing.standard)};
`

const Root = styled.div`
    &:hover ${DeleteBtn} {
        transform: scale(1);
    }

    & + & {
        margin-left: 16px;
    }
`

const Attachment = styled.div`
    width: 88px;
    border-radius: ${({ theme }) => theme.borderRadius / 2}px;
    overflow: hidden;

    & > img {
        width: 100%;
        object-fit: cover;
    }
`;

export default ({ className, index, type, thumb_url, onDelete }) => {
    const handleDelete = useCallback(() => {
        if (onDelete) {
            onDelete(index)
        }
    }, [index])
    return (
        <Root>
            <Attachment {...{ className }}>
                <img src={thumb_url} alt="attachment" />
            </Attachment>
            <DeleteBtn onClick={handleDelete}>
                <CancelIcon color="text" size={32} />
            </DeleteBtn>
        </Root>
    )
};