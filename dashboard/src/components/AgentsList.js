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

const AgentsList = ({ className }) => {
    return (
        <Root {...{ className }}>
            <Content>
                <Tabs>
                    <Tab active label="All" />
                    <Tab label="Admin" />
                    <Tab label="Agent" />
                </Tabs>
            </Content>
        </Root>
    );
};

export default AgentsList;
