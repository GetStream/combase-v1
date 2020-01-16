import React from "react"; // eslint-disable-line no-unused-vars
import styled from "styled-components";

export default styled.div`
  background-color: ${({ theme }) => theme.color.surface};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.16);
`;
