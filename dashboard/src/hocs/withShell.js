import React, { useMemo, useState } from "react";
import styled from "styled-components";

// Hooks //
import useMedia from "hooks/useMedia";

// Context //
import ShellContext from "contexts/Shell";

// Components //
import Header from "components/Header";
import Drawer from "components/Drawer";
import Sidenav from "components/Sidenav";

const Root = styled.div`
  flex: 1;
  overflow: hidden;
`;

export default (WrappedComponent, routes = []) => props => {
  const [drawerOpen, toggleDrawer] = useState(false);
  const isMobile = useMedia("sm");
  const value = useMemo(
    () => ({
      drawer: {
        open: drawerOpen,
        toggle: () => toggleDrawer(!drawerOpen)
      }
    }),
    [drawerOpen, toggleDrawer]
  );
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
      </Root>
    </ShellContext.Provider>
  );
};
