import React from "react"; // eslint-disable-line no-unused-vars
import styled from "styled-components";

const Tabs = styled.div`
  flex-direction: row;
  align-items: center;
  padding: 24px 0px;

  & > * + * {
    margin-left: 24px;
  }
`;

export default Tabs;
