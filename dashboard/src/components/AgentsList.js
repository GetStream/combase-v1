import React from 'react';
import styled from 'styled-components';

// Hooks //
import usePageSheet from 'hooks/usePageSheet';

// Components //
import { AgentsIcon } from 'shared/Icons';
import EmptyState from 'shared/EmptyState';
import Tabs from 'components/Tabs';
import PageSheet from 'components/PageSheet';
import PluginCard from 'components/PluginCard';

const Root = styled(PageSheet)`
    margin-top: -112px;
`;

const Content = styled.div`
    padding: 0px 40px 40px 40px;
`;

const List = styled.div`
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
        avatar: 'https://logo.clearbit.com/blazeverify.com',
        name: 'Luke Smetham',
        role: 'Admin',
    },
    {
        avatar: 'https://logo.clearbit.com/blazeverify.com',
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
    results.map((agent, key) => <p {...{ key }}>{agent.name}</p>);

const AgentsList = ({ className }) => {
    const [results, setQuery, activeTab, setActiveTab] = usePageSheet(
        agents,
        'name',
        'role'
    );

    return (
        <Root {...{ className }} onQueryChange={setQuery}>
            <Content>
                <Tabs
                    {...{ tabs }}
                    active={activeTab}
                    onTabClick={setActiveTab}
                />
                <List>
                    {results.length ? renderAgents(results) : renderEmpty()}
                </List>
            </Content>
        </Root>
    );
};

export default AgentsList;
