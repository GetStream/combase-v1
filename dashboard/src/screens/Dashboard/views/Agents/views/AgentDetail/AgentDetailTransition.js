import React from "react"; // eslint-disable-line no-unused-vars
import styled from "styled-components";
import Animated from "animated/lib/targets/react-dom";

// Hooks //
import usePrevious from "hooks/usePrevious";

// Components //
import UserBlock from "shared/UserBlock";
import Portal from "shared/Portal";

const Root = styled(Animated.div)`
  position: fixed;
  padding: 0px 40px;
  background-color: ${({ theme }) => theme.color.surface};
  z-index: ${({ theme }) => theme.z.modal + 1};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.16)};
  will-change: top, left, width, height;

`;

export default ({ agent, anim, endDims, hide, startDims }) => {
  const prevStartDims = usePrevious(startDims);
  if ((!startDims && !prevStartDims) || !endDims || hide) {
    return null;
  }
  const style = {
    top: anim.interpolate({
      inputRange: [0, 1],
      outputRange: startDims
        ? [startDims.top, endDims.top]
        : [prevStartDims.top, endDims.top]
    }),
    left: anim.interpolate({
      inputRange: [0, 1],
      outputRange: startDims
        ? [startDims.left, endDims.left]
        : [prevStartDims.left, endDims.left]
    }),
    width: anim.interpolate({
      inputRange: [0, 1],
      outputRange: startDims
        ? [startDims.width, endDims.width]
        : [prevStartDims.width, endDims.width]
    }),
    height: anim.interpolate({
      inputRange: [0, 1],
      outputRange: startDims
        ? [startDims.height, endDims.height]
        : [prevStartDims.height, endDims.height]
    })
  };

  return (
    <Portal>
      <Root {...{ style }}>
        <UserBlock
          avatar={agent.image}
          avatarSize={96}
          meta={agent.email}
          name={`${agent.name.first} ${agent.name.last}`}
          textSize={32}
        />
      </Root>
    </Portal>
  );
};
