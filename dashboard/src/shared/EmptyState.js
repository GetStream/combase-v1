import React from "react";
import styled from "styled-components";

// Components //
import Text from "shared/Text";

const Root = styled.div`
  justify-content: center;
  align-items: center;
  & > ${Text} {
    margin-top: 24px;
  }
`;

const Icon = styled.div`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.light_gray};
`;

export default ({ text = "Nothing to show." }) => (
  <Root>
    <Icon />
    <Text size={24} color="light_text" weight="500">
      {text}
    </Text>
  </Root>
);
