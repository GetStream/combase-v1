import React, { useMemo, useState } from "react";
import styled from "styled-components";

// Hooks //
import useAuth from "hooks/useAuth";
import useChatClient from "hooks/useChatClient";
import useConfig from "hooks/useConfig";
import useMedia from "hooks/useMedia";

// Context //
import ShellContext from "contexts/Shell";
import ChatContext from "contexts/Chat";

// Components //
import Helmet from "components/Shell/Helmet";
import Drawer from "components/Shell/Drawer";
import Sidenav from "components/Shell/Sidenav";
import LoadingState from "shared/LoadingState";

const Root = styled.div`
  flex: 1;
  overflow: hidden;
`;

export default (WrappedComponent, routes = []) => props => {
  const [config, { loading, error }] = useConfig();
  const [{ user }] = useAuth();
  const [drawerOpen, toggleDrawer] = useState(false);
  const chatClient = useChatClient(user, config);
  const isMobile = useMedia("sm");
  const value = useMemo(
    () => ({
      config,
      drawer: {
        open: drawerOpen,
        toggle: () => toggleDrawer(!drawerOpen)
      }
    }),
    [config, drawerOpen, toggleDrawer]
  );

  if (loading || !chatClient) {
    return <LoadingState key="loading" />;
  }

  if (error) {
    // TODO: Show error screen here
    return "Something went wrong!";
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
