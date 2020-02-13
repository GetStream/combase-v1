import React from 'react';
import styled from 'styled-components';

// Hooks //
import usePageSheet from 'hooks/usePageSheet';

// Components //
import { AgentsIcon } from 'shared/Icons';
import AgentItem from 'components/AgentItem';
import EmptyState from 'shared/EmptyState';
import FAB from 'shared/FAB';
import PageSheet from 'components/PageSheet';

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

const renderAgents = results =>
    results.map(({ name, ...agent }, key) => (
        <AgentItem
            {...agent}
            name={`${name.first} ${name.last}`}
            {...{ key }}
        />
    ));

const searchKeys = ['name.first', 'name.last'];

const AgentsList = ({ agents, className, tabs }) => {
    const [results, setQuery, activeTab, setActiveTab] = usePageSheet(
        agents,
        searchKeys,
        'role'
    );

    return (
        <Root
            {...{ activeTab, className, setActiveTab, tabs }}
            onQueryChange={setQuery}
        >
            <Content>
                {results.length ? renderAgents(results) : renderEmpty()}
            </Content>
            <FAB />
        </Root>
    );
};

export default AgentsList;
