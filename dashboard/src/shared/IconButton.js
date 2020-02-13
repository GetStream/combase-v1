import React, { memo, useCallback, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";

// Components //
const Root = styled.button`
  padding: 4px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;

const HoverBubble = styled(animated.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  background-color: ${({ color, disabled, theme }) =>
    theme.colorUtils.fade(theme.color[disabled ? "disabled" : color], 0.16)};
  transition: 0.24s background-color
    ${({ theme }) => theme.easing.css(theme.easing.standard)};
  transform: scale(0);
  transform-origin: center center;

  *:active > & {
    background-color: ${({ color, theme }) =>
      theme.colorUtils.fade(theme.color[color], 0.32)};
  }
`;

const IconButton = ({
  className,
  color,
  disabled,
  icon: Icon,
  onClick,
  onMouseOver,
  onMouseLeave,
  size,
  type
}) => {
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

  const handleMouseOver = useCallback(
    e => {
      if (!disabled) {
        setHovered(true);
      }
      if (onMouseOver) {
        onMouseOver(e);
      }
    },
    [disabled, onMouseOver]
  );

  const handleMouseLeave = useCallback(
    e => {
      if (!disabled || hovered) {
        setHovered(false);
      }
      if (onMouseLeave) {
        onMouseLeave(e);
      }
    },
    [disabled, hovered, onMouseLeave]
  );

  return (
    <Root
      onClick={!disabled ? onClick : null}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      {...{ className, disabled, type }}
    >
      <HoverBubble
        color={disabled ? "disabled" : color}
        {...{ disabled, style }}
      />
      <Icon color={disabled ? "disabled" : color} {...{ size }} />
    </Root>
  );
};

IconButton.propTypes = {
  color: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit"])
};

IconButton.defaultProps = {
  color: "text",
  type: "button"
};

export default memo(IconButton);
