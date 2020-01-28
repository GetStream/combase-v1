import React, { useMemo, useState } from 'react';
import styled from 'styled-components';

// Hooks //
import useMedia from 'hooks/useMedia';
import useConfig from 'hooks/useConfig';

// Context //
import ShellContext from 'contexts/Shell';

// Components //
import Helmet from 'components/Shell/Helmet';
import Drawer from 'components/Shell/Drawer';
import Sidenav from 'components/Shell/Sidenav';
import LoadingState from 'components/Shell/LoadingState';

const Root = styled.div`
    flex: 1;
    overflow: hidden;
`;

export default (WrappedComponent, routes = []) => props => {
    const [config, { loading, error }] = useConfig();
    const [drawerOpen, toggleDrawer] = useState(false);
    const isMobile = useMedia('sm');
    const value = useMemo(
        () => ({
            drawer: {
                open: drawerOpen,
                toggle: () => toggleDrawer(!drawerOpen),
            },
        }),
        [drawerOpen, toggleDrawer]
    );

    if (loading) {
        return <LoadingState />;
    }

    return (
        <ShellContext.Provider {...{ value }}>
            <Root>
                {isMobile ? (
                    <Drawer
                        {...props}
                        {...{ routes }}
                        open={drawerOpen}
                        onClose={value.drawer.toggle}
                    />
                ) : (
                    <Sidenav {...props} {...{ routes }} />
                )}
                <WrappedComponent {...props} />
                <Helmet />
            </Root>
        </ShellContext.Provider>
    );
};
