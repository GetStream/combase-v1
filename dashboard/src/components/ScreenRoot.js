import React from "react"; // eslint-disable-line no-unused-vars
import styled from "styled-components";

// CSS //
import pageCard from "styles/css/pageCard";

const ScreenRoot = styled.div`
  z-index: ${({ theme }) => theme.z.page};

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 96px;
    ${pageCard}
  }
`;

export default ScreenRoot;
