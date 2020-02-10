import React from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';

// Contexts //
import PluginsContext from 'contexts/Plugins';

// Hooks //
import useActivePlugins from 'hooks/useActivePlugins';

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
    padding-bottom: 40px;

    @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
        overflow-y: scroll;
    }
`;

const renderPluginModal = props => <PluginDetail {...props} />;

export default ({ match }) => {
    const activePlugins = useActivePlugins();
    return (
        <PluginsContext.Provider value={activePlugins}>
            <Root>
                <FullScreenHeader
                    icon={PluginsIcon}
                    text="Powerful apps and integrations to acquire, engage and retain more
            customers with Combase."
                    title="Plugins"
                />
                <Container>
                    <PluginsList />
                </Container>
                <Route
                    path={`${match.url}/:plugin`}
                    children={renderPluginModal}
                />
            </Root>
        </PluginsContext.Provider>
    );
};
