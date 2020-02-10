import React from 'react';
import styled from 'styled-components';

// Components //
import IconButton from 'shared/IconButton';
import { AttachmentIcon, AddImageIcon } from 'shared/Icons';

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
                <IconButton color="alt_text" icon={AddImageIcon} />
            </Root>
        </Root>
    );
};

export default Actions;
