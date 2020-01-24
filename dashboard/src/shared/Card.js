import React from "react";
import styled from "styled-components";

const Card = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius}px;
  background-color: ${({ color, theme }) => theme.color[color]};
  box-shadow: ${({ flat }) =>
    !flat ? "0px 4px 40px rgba(0, 0, 0, 0.12)" : null};
  border: ${({ border, theme }) =>
    border ? `1px solid ${theme.color.border}` : null};
`;

Card.defaultProps = {
  border: false,
  color: "surface",
  flat: false
};

export default Card;
