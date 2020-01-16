import React from "react"; // eslint-disable-line no-unused-vars
import styled from "styled-components";

const Text = styled.p`
  font-size: ${({ size }) => size}px;
  color: ${({ color, theme }) => theme.color[color]};
  font-weight: ${({ weight }) => weight};
  opacity: ${({ faded }) => (faded ? 0.72 : 1)};
`;

Text.defaultProps = {
  color: "text",
  size: 16,
  weight: "400"
};

export default Text;
