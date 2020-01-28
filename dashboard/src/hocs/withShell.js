import React, { useEffect, useMemo, useState } from 'react';
import { StreamChat } from 'stream-chat';
import styled from 'styled-components';

// Hooks //
import useMedia from 'hooks/useMedia';
import useConfig from 'hooks/useConfig';

// Context //
import ShellContext from 'contexts/Shell';
import ChatContext from 'contexts/Chat';

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
    const [chatClient, setChatClient] = useState(null);
    const isMobile = useMedia('sm');

    useEffect(() => {
        if (config.stream && !chatClient) {
            const client = new StreamChat(config.stream.key);
            setChatClient(client);
        }        
    }, [config.stream, chatClient]);

    const value = useMemo(
        () => ({
            config,
            drawer: {
                open: drawerOpen,
                toggle: () => toggleDrawer(!drawerOpen),
            },
        }),
        [config, drawerOpen, toggleDrawer]
    );
    
    if (loading || !chatClient) {
        return <LoadingState />;
    }

    if (error) {
        // TODO: Show error screen here
        return 'Something went wrong!'
    }

    return (
        <ShellContext.Provider {...{ value }}>
            <ChatContext.Provider value={chatClient}>
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
            </ChatContext.Provider>
        </ShellContext.Provider>
    );
};
