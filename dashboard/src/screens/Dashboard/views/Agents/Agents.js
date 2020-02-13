import React from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';

// Contexts //
import AgentsContext from 'contexts/Agents';

// Hooks //
import useAgents from 'hooks/useAgents';

// Views //
import AgentDetail from './views/AgentDetail';

// Components ///
import { AgentsIcon } from 'shared/Icons';
import ScreenRoot from 'shared/ScreenRoot';
import Container from 'shared/Container';
import FullScreenHeader from 'components/FullScreenHeader';
import AgentsList from 'components/AgentsList';

const Root = styled(ScreenRoot)`
    flex: 1;
    padding-bottom: 40px;
    -webkit-overflow-scrolling: touch;
    overflow-y: scroll;
    @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
        overflow-y: scroll;
    }
`;

const renderAgentDetail = props => <AgentDetail {...props} />;

export default ({ match }) => {
    const [agents, tabs] = useAgents();
    return (
        <AgentsContext.Provider value={agents}>
            <Root>
                <FullScreenHeader
                    icon={AgentsIcon}
                    text={`${agents.length} total agents`}
                    title="Agents"
                />
                <Container>
                    <AgentsList {...{ agents, tabs }} />
                </Container>
                <Route
                    path={`${match.url}/:agentId`}
                    children={renderAgentDetail}
                />
            </Root>
        </AgentsContext.Provider>
    );
};
