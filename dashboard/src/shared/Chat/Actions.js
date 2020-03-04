import React from 'react';
import styled from 'styled-components';
import { IconButton } from '@comba.se/ui';
import { AttachmentIcon, ResponsesIcon } from "@comba.se/ui/Icons";

// Components //
const Root = styled.div`
    flex-direction: row;
    align-items: center;
    margin-right: 24px;
    z-index: 2;

    & > & {
        margin-right: 0px;
    }

    & > * + * {
        margin-left: 8px;

        @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
            margin-left: 16px;
        }
    }
`;

const Actions = props => {
    return (
        <Root>
            <Root>
                <IconButton color="alt_text" icon={AttachmentIcon} />
                <IconButton color="alt_text" icon={ResponsesIcon} />
            </Root>
        </Root>
    );
};

export default Actions;
