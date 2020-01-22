import React from "react";
import styled from "styled-components";

// Components //
const Root = styled.div`
  justify-content: center;
  align-items: center;
  padding: 24px 0px;
`;

const Icon = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.gray};
`;

export default () => {
  return (
    <Root>
      <Icon />
    </Root>
  );
};
