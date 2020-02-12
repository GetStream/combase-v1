import React, { useCallback, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';

// Utils //
import request from 'utils/request';

// Contexdts //
import AuthContext from 'contexts/Auth';

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
    const [tabs, setTabs] = useState(['All']);
    const [agents, setAgents] = useState([]);
    const user = useContext(AuthContext);
    const getAgents = useCallback(async () => {
        try {
            const agents = await request(
                `v1/agents?refs.organization._id=${user.refs.organization._id}`,
                'get',
                null,
                user.tokens.api
            );
            setAgents(agents);
            setTabs([
                ...new Set([
                    'All',
                    ...agents
                        .reduce((acc, { role }) => {
                            return [...acc, role];
                        }, [])
                        .sort(),
                ]),
            ]);
        } catch (error) {
            // TODO: Error Handling
            console.log(error);
        }
    }, [user.tokens.api, user.refs.organization._id]);
    useEffect(() => {
        getAgents();
    }, [getAgents]);

    return (
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
    );
};
