import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";

// Components //
const Root = styled.div`
  padding: 4px;
  cursor: pointer;
`;

const HoverBubble = styled(animated.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  background-color: ${({ color, theme }) =>
    theme.colorUtils.fade(theme.color[color], 0.16)};
  transition: 0.24s background-color
    ${({ theme }) => theme.easing.css(theme.easing.standard)};
  transform: scale(0);
  transform-origin: center center;

  *:active > & {
    background-color: ${({ color, theme }) =>
      theme.colorUtils.fade(theme.color[color], 0.32)};
  }
`;

const IconButton = ({ color, icon: Icon, onClick, size }) => {
  const [hovered, setHovered] = useState(false);
  const anim = useSpring({
    value: hovered ? 1 : 0,
    config: {
      tension: 200,
      friction: 18
    }
  });

  const style = {
    transform: anim.value
      .interpolate({
        range: [0, 1],
        output: [0, 1.2],
        extrapolateLeft: "clamp"
      })
      .interpolate(value => `scale(${value})`)
  };

  return (
    <Root
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...{ onClick }}
    >
      <HoverBubble {...{ color, style }} />
      <Icon {...{ color, size }} />
    </Root>
  );
};

IconButton.propTypes = {
  icon: PropTypes.func
};

export default IconButton;
