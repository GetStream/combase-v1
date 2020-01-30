import React from 'react';
import styled from 'styled-components';

// CSS //
import pageCard from 'styles/css/pageCard';

// Components //
import Chat from 'shared/Chat';
import { ChatIcon } from 'shared/Icons';
import EmptyState from 'shared/EmptyState';

const Root = styled.div`
    flex: 1;
    z-index: 2;
    background-color: ${({ theme }) => theme.color.surface};

    @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
        ${pageCard}
    }
`;

const EmptyRoot = styled(Root)`
    justify-content: center;
    align-items: center;
`;

const user = { id: 'lukesmetham', name: 'Luke' };

export default ({ match }) => {
    if (!match) {
        return (
            <EmptyRoot>
                <EmptyState icon={ChatIcon} text="Select a thread." />
            </EmptyRoot>
        );
    }

    return (
        <Root>
            <Chat {...{ user }} />
        </Root>
    );
};
