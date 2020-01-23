import React, { createElement } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

// Components //
import Text from "components/Text";

const Root = styled.div`
  padding: 4px 8px;
  pointer-events: ${({ active, disabled }) =>
    disabled ? "none" : active ? "none" : "auto"};
  cursor: pointer;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  overflow: hidden;
  flex: 1;
  padding: 12px;
  color: ${({ activeColor, theme }) => theme.color[activeColor]};
  border-radius: ${({ theme }) => theme.borderRadius / 2}px;
  transition: 0.24s background-color
    ${({ theme }) => theme.easing.css(theme.easing.standard)};
  background-color: ${({ active, activeColor, theme }) =>
    active
      ? theme.colorUtils.fade(theme.color[activeColor], 0.16)
      : "transparent"};

  & > svg {
    margin-right: 24px;
  }

  &:hover {
    background-color: ${({ activeColor, theme }) =>
      theme.colorUtils.fade(theme.color[activeColor], 0.08)};
  }

  &:active {
    background-color: ${({ activeColor, theme }) =>
      theme.colorUtils.fade(theme.color[activeColor], 0.16)};
  }
`;

const Label = styled(Text)`
  user-select: none;
`;

const DrawerItem = ({
  active,
  activeColor,
  color,
  disabled,
  icon,
  label,
  onClick,
  to,
  ...rest
}) => {
  const isLink = Boolean(to);
  const colorValue = disabled ? "disabled" : active ? activeColor : color;
  return (
    <Root
      as={isLink ? Link : "div"}
      active={active}
      disabled={disabled}
      to={to}
      onClick={onClick}
    >
      <Wrapper
        active={active}
        activeColor={disabled ? "disabled" : activeColor}
        {...rest}
      >
        {icon && createElement(icon, { color: colorValue })}
        <Label size={16} weight="500" color={colorValue}>
          {label}
        </Label>
      </Wrapper>
    </Root>
  );
};

DrawerItem.propTypes = {
  active: PropTypes.bool,
  activeColor: PropTypes.string,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.func,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  to: PropTypes.string
};

DrawerItem.defaultProps = {
  activeColor: "primary",
  color: "text"
};

export default DrawerItem;
