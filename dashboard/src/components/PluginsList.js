import React from 'react';
import styled from 'styled-components';

// Hooks //
import usePageSheet from 'hooks/usePageSheet';

// Data //
import plugins from 'data/plugins';

// Components //
import EmptyState from 'shared/EmptyState';
import { PluginsIcon } from 'shared/Icons';
import PageSheet from 'components/PageSheet';
import PluginCard from 'components/PluginCard';

const Root = styled(PageSheet)`
    margin-top: -112px;
`;

const Content = styled.div`
    padding: 0px 40px 40px 40px;
`;

const Grid = styled.div`
    display: flex;
`;

const Row = styled.div`
    margin: 0 -8px;
    flex-direction: row;
    flex-wrap: wrap;
`;

const Cell = styled.div`
    flex: 0 1 25%;
    padding: 8px;
`;

const EmptyWrapper = styled.div`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 40px 0px;
`;

const tabs = [
    ...new Set([
        'All',
        ...plugins
            .reduce((acc, { type }) => {
                return [...acc, type];
            }, [])
            .sort(),
    ]),
];

const renderEmpty = () => (
    <EmptyWrapper>
        <EmptyState icon={PluginsIcon} text="No plugins match your search." />
    </EmptyWrapper>
);

const renderPlugins = results =>
    results.map((plugin, key) => (
        <Cell {...{ key }}>
            <PluginCard {...plugin} />
        </Cell>
    ));

const PluginsList = ({ className }) => {
    const [results, setQuery, activeTab, setActiveTab] = usePageSheet(
        plugins,
        'title',
        'type'
    );

    return (
        <Root {...{ activeTab, className, setActiveTab, tabs }} onQueryChange={setQuery}>
            <Content>
                <Grid>
                    <Row>
                        {results.length
                            ? renderPlugins(results)
                            : renderEmpty()}
                    </Row>
                </Grid>
            </Content>
        </Root>
    );
};

export default PluginsList;
