import React, { useCallback, useContext, useEffect } from 'react';
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

const agents = [
    {
        avatar:
            'https://ca.slack-edge.com/T02RM6X6B-UHLLRBJBU-7c9e3281197f-512',
        email: 'luke@getstream.io',
        name: 'Luke Smetham',
        role: 'Admin',
        _id: 0,
    },
    {
        avatar:
            'https://ca.slack-edge.com/T02RM6X6B-U10BF2R9R-ff801b9cc079-512',
        email: 'nick@getstream.io',
        name: 'Nick Parsons',
        role: 'Admin',
        _id: 1,
    },
    {
        avatar:
            'https://ca.slack-edge.com/T02RM6X6B-U02U7SJP4-0f65a5997877-512',
        email: 'tommaso@getstream.io',
        name: 'Tommaso Barbugli',
        role: 'Agent',
        _id: 2,
    },
    {
        avatar:
            'https://ca.slack-edge.com/T02RM6X6B-ULM9UDW58-4c56462d52a4-512',
        email: 'merel@getstream.io',
        name: 'Merel Van Helbergen',
        role: 'Agent',
        _id: 3,
    },
    {
        avatar:
            'https://ca.slack-edge.com/T02RM6X6B-USFS2470B-5eb8201c4f44-512',
        email: 'seni@getstream.io',
        name: 'Séni Gueye',
        role: 'Agent',
        _id: 4,
    },
    {
        avatar:
            'https://ca.slack-edge.com/T02RM6X6B-U9V0XUAD6-e45a8b9a0fb7-512',
        email: 'jaap@getsream.io',
        name: 'Jaap Bakker',
        role: 'Agent',
        _id: 5,
    },
    {
        avatar:
            'https://ca.slack-edge.com/T02RM6X6B-U5KT650MQ-5a65b75846de-512',
        email: 'scott@getstream.io',
        name: 'Young Shatner',
        role: 'Admin',
        _id: 6,
    },
    {
        avatar:
            'https://ca.slack-edge.com/T02RM6X6B-UHGDQJ8A0-31658896398c-512',
        email: 'vish@getstream.io',
        name: 'Vishal Narkhede',
        role: 'Agent',
        _id: 7,
    },
    {
        avatar:
            'https://ca.slack-edge.com/T02RM6X6B-U02RM6X6D-g28a1278a98e-512',
        email: 'thierry@getstream.io',
        name: 'Thierry Schellenbach',
        role: 'Admin',
        _id: 8,
    },
    {
        avatar:
            'https://ca.slack-edge.com/T02RM6X6B-UDVG5KLPN-c0b8ba29eced-512',
        email: 'alexey@getstream.io',
        name: 'Alexey Bukhtin',
        role: 'Agent',
        _id: 9,
    },
    {
        avatar:
            'https://ca.slack-edge.com/T02RM6X6B-U0JNN4BFE-52b2c5f7e1f6-512',
        email: 'josh@getstream.io',
        name: 'Joshua Tilton',
        role: 'Admin',
        _id: 10,
    },
];

const tabs = [
    ...new Set([
        'All',
        ...agents
            .reduce((acc, { role }) => {
                return [...acc, role];
            }, [])
            .sort(),
    ]),
];

const renderAgentDetail = props => <AgentDetail {...props} />;

export default ({ match }) => {
    const user = useContext(AuthContext);
    const getAgents = useCallback(async () => {
        try {
            const agents = await request(
                `v1/agents?refs.organization._id=${user.refs.organization._id}`,
                'get',
                null,
                user.tokens.api
            );
            console.log(agents);
        } catch (error) {
            // TODO: Error Handling
            console.log(error);
        }
    }, []);
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
