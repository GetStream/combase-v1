import React from 'react';
import styled from 'styled-components';

// Hooks //
import usePageSheet from 'hooks/usePageSheet';

// Components //
import EmptyState from 'shared/EmptyState';
import { PluginsIcon } from 'shared/Icons';
import Tabs from 'components/Tabs';
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

const plugins = [
    {
        avatar: 'https://logo.clearbit.com/blazeverify.com',
        description:
            'Email address verification that improves quality and deliverability.',
        title: 'Blaze Verify',
        url: 'https://blazeverify.com/',
        type: 'Enrichment',
    },
    {
        avatar: 'https://logo.clearbit.com/clearbit.com',
        description: 'Provide enriched data on the user you are talking with.',
        title: 'Clearbit',
        url: 'https://clearbit.com',
        type: 'Enrichment',
    },
    {
        avatar:
            'https://www.hubspot.com/hubfs/assets/hubspot.com/style-guide/brand-guidelines/guidelines_approved-sprocket-2.svg',
        description:
            'HubSpot is a developer and marketer of software products for inbound marketing and sales',
        title: 'HubSpot',
        url: 'https://hubspot.com',
        type: 'CRM',
    },
    {
        avatar: 'https://logo.clearbit.com/zapier.com',
        description:
            'Connect the apps you use everyday to automate your work and be more productive.',
        title: 'Zapier',
        url: 'https://zapier.com',
        type: 'I/O',
    },
    {
        avatar: 'https://logo.clearbit.com/gaiq-center.com',
        description:
            'Google Analytics is a web analytics service offered by Google that tracks and reports website traffic.',
        title: 'Google Analytics',
        url: 'https://analytics.google.com',
        type: 'Analytics',
    },
    {
        avatar: 'https://logo.clearbit.com/slack.com',
        description: 'Convert your hottest leads right from Slack.',
        title: 'Slack',
        url: 'https://slack.com',
        type: 'CRM',
    },
    {
        avatar: 'https://logo.clearbit.com/mailchimp.com',
        description:
            'Mailchimp is an American marketing automation platform and an email marketing service.',
        title: 'Mailchimp',
        url: 'https://mailchimp.com',
        type: 'CRM',
    },
    {
        avatar: 'https://logo.clearbit.com/stripe.dev',
        description:
            'Stripe allows individuals and businesses to make and receive payments over the Internet.',
        title: 'Stripe',
        url: 'https://stripe.com',
        type: 'Payments',
    },
];

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
        <Root {...{ className }} onQueryChange={setQuery}>
            <Tabs {...{ tabs }} active={activeTab} onTabClick={setActiveTab} />
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
