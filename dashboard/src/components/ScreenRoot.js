import React from "react"; // eslint-disable-line no-unused-vars
import styled from "styled-components";

const ScreenRoot = styled.div`
  z-index: ${({ theme }) => theme.z.page};
  overflow: visible;
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 96px;
  }
`;

export default ScreenRoot;
