import React, { useState } from "react";
import styled, { withTheme } from "styled-components";
import Animated from "animated/lib/targets/react-dom";
import { Switch } from "react-router-dom";

// Hooks //
import useMedia from "hooks/useMedia";

// Components //
import ListDetailTransition from "./ListDetailTransition";

const Root = styled.div`
  flex: 1;
  flex-direction: row;
  height: 100%;
  overflow: hidden;
`;

const anim = new Animated.Value(0);
const ListDetailView = ({
  children,
  location,
  match,
  rootAs,
  transitionAnim = anim
}) => {
  const [animating, setAnimating] = useState(false);
  const useStack = useMedia("sm");
  if (useStack) {
    return (
      <Root as={rootAs}>
        <ListDetailTransition
          {...{ animating, location, setAnimating }}
          anim={transitionAnim}
          atParent={match.isExact}
        >
          <Switch {...{ location }}>{children}</Switch>
        </ListDetailTransition>
      </Root>
    );
  }
  return <Root as={rootAs}>{children}</Root>;
};

export default withTheme(ListDetailView);
