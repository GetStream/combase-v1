import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { useStyledMedia } from "layout-hooks";

// Context //
import ShellContext from "contexts/Shell";

// Components //
import Sidenav from "components/Sidenav";

const Root = styled.div`
  flex: 1;
  overflow: hidden;
  flex-direction: row;
`;

export default (WrappedComponent, routes = []) => props => {
  const [drawerOpen, toggleDrawer] = useState(false);
  const isMobile = useStyledMedia("sm", "min");
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
        <Sidenav {...props} {...{ routes }} />
        <WrappedComponent {...props} />
      </Root>
    </ShellContext.Provider>
  );
};
