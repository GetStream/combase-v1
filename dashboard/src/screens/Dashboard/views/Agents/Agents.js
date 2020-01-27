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

const agents = [
    {
        avatar:
            'https://ca.slack-edge.com/T02RM6X6B-UHLLRBJBU-7c9e3281197f-512',
        email: 'luke@getstream.io',
        name: 'Luke Smetham',
        role: 'Admin',
    },
    {
        avatar:
            'https://ca.slack-edge.com/T02RM6X6B-U10BF2R9R-ff801b9cc079-512',
        email: 'nick@getstream.io',
        name: 'Nick Parsons',
        role: 'Admin',
    },
    {
        avatar:
            'https://ca.slack-edge.com/T02RM6X6B-U02U7SJP4-0f65a5997877-512',
        email: 'tommaso@getstream.io',
        name: 'Tommaso Barbugli',
        role: 'Agent',
    },
    {
        avatar:
            'https://ca.slack-edge.com/T02RM6X6B-ULM9UDW58-4c56462d52a4-512',
        email: 'merel@getstream.io',
        name: 'Merel Van Helkbergen',
        role: 'Agent',
    },
    {
        avatar:
            'https://ca.slack-edge.com/T02RM6X6B-USFS2470B-5eb8201c4f44-512',
        email: 'seni@getstream.io',
        name: 'Séni Gueye',
        role: 'Agent',
    },
    {
        avatar:
            'https://ca.slack-edge.com/T02RM6X6B-U9V0XUAD6-e45a8b9a0fb7-512',
        email: 'jaap@getsream.io',
        name: 'Jaap Bakker',
        role: 'Agent',
    },
    {
        avatar:
            'https://ca.slack-edge.com/T02RM6X6B-U5KT650MQ-5a65b75846de-512',
        email: 'scott@getstream.io',
        name: 'Young Shatner',
        role: 'Admin',
    },
    {
        avatar:
            'https://ca.slack-edge.com/T02RM6X6B-UHGDQJ8A0-31658896398c-512',
        email: 'vish@getstream.io',
        name: 'Vishal Narkhede',
        role: 'Agent',
    },
    {
        avatar:
            'https://ca.slack-edge.com/T02RM6X6B-U02RM6X6D-g28a1278a98e-512',
        email: 'thierry@getstream.io',
        name: 'Thierry Schellenbach',
        role: 'Admin',
    },
    {
        avatar:
            'https://ca.slack-edge.com/T02RM6X6B-UDVG5KLPN-c0b8ba29eced-512',
        email: 'alexey@getstream.io',
        name: 'Alexey Bukhtin',
        role: 'Agent',
    },
    {
        avatar:
            'https://ca.slack-edge.com/T02RM6X6B-U0JNN4BFE-52b2c5f7e1f6-512',
        email: 'josh@getstream.io',
        name: 'Joshua Tilton',
        role: 'Admin',
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

export default () => (
    <Root>
        <FullScreenHeader
            icon={AgentsIcon}
            text={`${agents.length} total agents`}
            title="Agents"
        />
        <Container>
            <AgentsList {...{ agents, tabs }} />
        </Container>
    </Root>
);
