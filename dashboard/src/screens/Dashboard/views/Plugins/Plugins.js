import React from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';

// Views //
import PluginDetail from './views/PluginDetail';

// Components ///
import { PluginsIcon } from 'shared/Icons';
import ScreenRoot from 'shared/ScreenRoot';
import Container from 'shared/Container';
import FullScreenHeader from 'components/FullScreenHeader';
import PluginsList from 'components/PluginsList';

const Root = styled(ScreenRoot)`
    flex: 1;
    overflow-y: scroll;
    padding-bottom: 40px;
`;

const renderPluginModal = props => <PluginDetail {...props} />;

export default ({ match }) => (
    <Root>
        <FullScreenHeader
            icon={PluginsIcon}
            text="Powerful apps and integrations to acquire, engage and retain more
            customers with Comba."
            title="Plugins"
        />
        <Container>
            <PluginsList />
        </Container>
        <Route path={`${match.url}/:plugin`} children={renderPluginModal} />
    </Root>
);
