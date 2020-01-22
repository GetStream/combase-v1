import React from "react"; // eslint-disable-line no-unused-vars
import styled from "styled-components";

const StatusBadge = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.green};
  border: 4px solid ${({ bgColor = "surface", theme }) => theme.color[bgColor]};
`;

export default StatusBadge;
