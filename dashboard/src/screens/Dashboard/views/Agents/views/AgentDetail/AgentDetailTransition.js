import React from "react"; // eslint-disable-line no-unused-vars
import styled from "styled-components";
import Animated from "animated/lib/targets/react-dom";

// Components //
import Portal from "shared/Portal";

const Root = styled(Animated.div)`
  position: fixed;
  background-color: ${({ theme }) => theme.color.surface};
  z-index: 999999;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.16)}
`;

export default ({ anim, endDims, startDims }) => {
  if (!startDims || !endDims) {
    return null;
  }
  const style = {
    top: anim.interpolate({
      inputRange: [0, 1],
      outputRange: [startDims.top, endDims.top]
    }),
    left: anim.interpolate({
      inputRange: [0, 1],
      outputRange: [startDims.left, endDims.left]
    }),
    width: anim.interpolate({
      inputRange: [0, 1],
      outputRange: [startDims.width, endDims.width]
    }),
    height: anim.interpolate({
      inputRange: [0, 1],
      outputRange: [startDims.height, endDims.height]
    })
  };

  return (
    <Portal>
      <Root {...{ style }}></Root>
    </Portal>
  );
};
