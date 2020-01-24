import React from "react";
import styled from "styled-components";

const Card = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius}px;
  background-color: ${({ color, theme }) => theme.color[color]};
  box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.12);
`;

Card.defaultProps = {
  color: "surface"
};

export default Card;
