import React from "react";
import styled from "styled-components";
import { Route } from "react-router-dom";
import Animated from "animated/lib/targets/react-dom";

// Components //
import Modal from "shared/Modal";
import DrawerItem from "./DrawerItem";

const Root = styled(Animated.div)`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.color.surface};
  width: 280px;
  z-index: ${({ theme }) => theme.z.modal};
`;

const renderRoutes = (routes, match, onClose) =>
  routes.map((route, key) => (
    <Route
      {...{ key }}
      path={`${match.url}${route.slug}`}
      children={({ match: active }) => (
        <DrawerItem
          {...{ active }}
          to={`${match.url}${route.slug}`}
          label={route.label}
          onClick={onClose}
        />
      )}
    />
  ));

const Drawer = ({ anim, match, onClose, open, routes }) => {
  const style = {
    transform: [
      {
        translateX: anim.interpolate({
          inputRange: [0, 1],
          outputRange: ["-100%", "-0%"]
        })
      }
    ]
  };
  return (
    <Modal animatedValue={anim} animated {...{ onClose, open }}>
      <Root {...{ style }}>{renderRoutes(routes, match, onClose)}</Root>
    </Modal>
  );
};

Drawer.defaultProps = {
  anim: new Animated.Value(0)
};

export default Drawer;
