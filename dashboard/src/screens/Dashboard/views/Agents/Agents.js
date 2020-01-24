import React from 'react';
import styled from 'styled-components';

// Components ///
import { AgentsIcon } from 'shared/Icons';
import ScreenRoot from 'shared/ScreenRoot';
import Container from 'shared/Container';
import FullScreenHeader from 'components/FullScreenHeader';
import AgentsList from 'components/AgentsList';

const Root = styled(ScreenRoot)`
    flex: 1;
    overflow-y: scroll;
    padding-bottom: 40px;
`;

export default () => (
    <Root>
        <FullScreenHeader icon={AgentsIcon} text="12 total" title="Agents" />
        <Container>
            <AgentsList />
        </Container>
    </Root>
);
