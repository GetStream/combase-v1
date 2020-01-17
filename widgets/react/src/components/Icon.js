import React from "react";
import PropTypes from "prop-types";
import styled, { withTheme } from "styled-components";

const Root = styled.span`
  font-size: ${({ size }) => size}px;
  color: ${({ color, theme }) => theme.color[color]};
`;

const Icon = ({ className, color, iconName, theme, size, style, ...rest }) => (
  <Root
    {...{ color, size }}
    className={`material-icons ${className}`}
    {...rest}
  >
    {iconName}
  </Root>
);

Icon.propTypes = {
  color: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  size: PropTypes.number.isRequired
};

Icon.defaultProps = {
  color: "text",
  size: 24,
  viewBox: "0 0 24 24"
};

export default withTheme(Icon);
