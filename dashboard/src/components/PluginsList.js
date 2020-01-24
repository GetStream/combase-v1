import React, { useState } from 'react';
import styled from 'styled-components';

// Components //
import Tabs, { Tab } from 'components/Tabs';
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

const plugins = [
    {
        avatar: 'https://logo.clearbit.com/blazeverify.com',
        description:
            'Email address verification that improves quality and deliverability.',
        title: 'Blaze Verify',
        url: 'https://blazeverify.com/',
    },
    {
        avatar: 'https://logo.clearbit.com/clearbit.com',
        description: 'Provide enriched data on the user you are talking with.',
        title: 'Clearbit',
        url: 'https://clearbit.com',
    },
    {
        avatar:
            'https://www.hubspot.com/hubfs/assets/hubspot.com/style-guide/brand-guidelines/guidelines_approved-sprocket-2.svg',
        description:
            'HubSpot is a developer and marketer of software products for inbound marketing and sales',
        title: 'HubSpot',
        url: 'https://hubspot.com',
    },
    {
        avatar: 'https://logo.clearbit.com/zapier.com',
        description:
            'Connect the apps you use everyday to automate your work and be more productive.',
        title: 'Zapier',
        url: 'https://zapier.com',
    },
    {
        avatar: 'https://logo.clearbit.com/gaiq-center.com',
        description:
            'Google Analytics is a web analytics service offered by Google that tracks and reports website traffic.',
        title: 'Google Analytics',
        url: 'https://analytics.google.com',
    },
    {
        avatar: 'https://logo.clearbit.com/slack.com',
        description: 'Convert your hottest leads right from Slack.',
        title: 'Slack',
        url: 'https://slack.com',
    },
    {
        avatar: 'https://logo.clearbit.com/mailchimp.com',
        description:
            'Mailchimp is an American marketing automation platform and an email marketing service.',
        title: 'Mailchimp',
        url: 'https://mailchimp.com',
    },
    {
        avatar: 'https://logo.clearbit.com/stripe.dev',
        description:
            'Stripe allows individuals and businesses to make and receive payments over the Internet.',
        title: 'Stripe',
        url: 'https://stripe.com',
    },
];

const renderPlugins = query =>
    plugins
        .filter(({ title }) =>
            title.toLowerCase().includes(query.toLowerCase())
        )
        .map((plugin, key) => (
            <Cell {...{ key }}>
                <PluginCard {...plugin} />
            </Cell>
        ));

const PluginsList = ({ className }) => {
    const [query, setQuery] = useState('');
    return (
        <Root {...{ className }} onQueryChange={setQuery}>
            <Content>
                <Tabs>
                    <Tab active label="All" />
                    <Tab label="Enrichment" />
                    <Tab label="CRM" />
                    <Tab label="Custom" />
                </Tabs>
                <Grid>
                    <Row>{renderPlugins(query)}</Row>
                </Grid>
            </Content>
        </Root>
    );
};

export default PluginsList;
