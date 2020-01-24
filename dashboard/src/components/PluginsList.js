import React from 'react';
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
    flex: 1 1 25%;
    padding: 8px;
`;

const PluginsList = ({ className }) => {
    return (
        <Root {...{ className }}>
            <Content>
                <Tabs>
                    <Tab active label="All" />
                    <Tab label="Enrichment" />
                    <Tab label="CRM" />
                    <Tab label="Custom" />
                </Tabs>
                <Grid>
                    <Row>
                        <Cell>
                            <PluginCard
                                avatar="https://logo.clearbit.com/blazeverify.com"
                                description="Email address verification that improves quality and deliverability."
                                title="Blaze Verify"
                                url="https://blazeverify.com/"
                            />
                        </Cell>
                        <Cell>
                            <PluginCard
                                avatar="https://logo.clearbit.com/clearbit.com"
                                description="Provide enriched data on the user you are talking with."
                                title="Clearbit"
                                url="https://clearbit.com"
                            />
                        </Cell>
                        <Cell>
                            <PluginCard
                                avatar="https://media-exp1.licdn.com/dms/image/C560BAQFhSyJmEbHWJw/company-logo_200_200/0?e=2159024400&v=beta&t=EPB2Wt63lokj12x7curh9CGkojnQSyLcOK-8hr-S8JU"
                                description="HubSpot is a developer and marketer of software products for inbound marketing and sales"
                                title="HubSpot"
                                url="https://hubspot.com"
                            />
                        </Cell>
                        <Cell>
                            <PluginCard
                                avatar="https://logo.clearbit.com/zapier.com"
                                description="Connect the apps you use everyday to automate your work and be more productive."
                                title="Zapier"
                                url="https://zapier.com"
                            />
                        </Cell>
                        <Cell>
                            <PluginCard
                                avatar="https://logo.clearbit.com/gaiq-center.com"
                                description="Google Analytics is a web analytics service offered by Google that tracks and reports website traffic."
                                title="Google Analytics"
                                url="https://analytics.google.com"
                            />
                        </Cell>
                        <Cell>
                            <PluginCard
                                avatar="https://logo.clearbit.com/slack.com"
                                description="Convert your hottest leads right from Slack."
                                title="Slack"
                                url="https://slack.com"
                            />
                        </Cell>
                        <Cell>
                            <PluginCard
                                avatar="https://logo.clearbit.com/mailchimp.com"
                                description="Mailchimp is an American marketing automation platform and an email marketing service."
                                title="Mailchimp"
                                url="https://mailchimp.com"
                            />
                        </Cell>
                        <Cell>
                            <PluginCard
                                avatar="https://logo.clearbit.com/stripe.dev"
                                description="Stripe allows individuals and businesses to make and receive payments over the Internet."
                                title="Stripe"
                                url="https://stripe.com"
                            />
                        </Cell>
                    </Row>
                </Grid>
            </Content>
        </Root>
    );
};

export default PluginsList;
