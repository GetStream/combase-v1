import React from 'react';
import styled from 'styled-components';

// Hooks //
import usePageSheet from 'hooks/usePageSheet';

// Components //
import { AgentsIcon } from 'shared/Icons';
import AgentItem from 'components/AgentItem';
import EmptyState from 'shared/EmptyState';
import Tabs from 'components/Tabs';
import PageSheet from 'components/PageSheet';
import PluginCard from 'components/PluginCard';

const Root = styled(PageSheet)`
    margin-top: -112px;
`;

const Content = styled.div`
    flex: 1;
`;

const EmptyWrapper = styled.div`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 40px 0px;
`;

const renderEmpty = () => (
    <EmptyWrapper>
        <EmptyState icon={AgentsIcon} text="No agents match your search." />
    </EmptyWrapper>
);

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
        role: 'Agent',
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

const renderAgents = results =>
    results.map((agent, key) => <AgentItem {...agent} {...{ key }} />);

const AgentsList = ({ className }) => {
    const [results, setQuery, activeTab, setActiveTab] = usePageSheet(
        agents,
        'name',
        'role'
    );

    return (
        <Root {...{ className }} onQueryChange={setQuery}>
            <Tabs {...{ tabs }} active={activeTab} onTabClick={setActiveTab} />
            <Content>
                {results.length ? renderAgents(results) : renderEmpty()}
            </Content>
        </Root>
    );
};

export default AgentsList;
