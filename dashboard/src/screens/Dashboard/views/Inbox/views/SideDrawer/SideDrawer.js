import React from "react";
import styled from "styled-components";
import { Switch, Route } from "react-router-dom";

// Views //
import InfoDrawer from "./views/InfoDrawer";

// Components //
const Root = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 376px;
  z-index: 3;
  background-color: ${({ theme }) => theme.color.surface};
  border-left: 1px solid ${({ theme }) => theme.color.border};
  transform: translateX(${({ open }) => (open ? 0 : 100)}%);
`;

const SideDrawer = ({ match, open }) => (
  <Root {...{ open }}>
    <Switch>
      <Route path={`${match.url}/info`} render={props => <InfoDrawer {...props} channelId={match.params.channel} />} />
      <Route path={`${match.url}/transfer`} render={() => "transfer"} />
    </Switch>
  </Root>
);

export default SideDrawer;
