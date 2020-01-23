import React from "react";
import styled from "styled-components";

// Styles //
import listItemInteractions from "styles/css/listItemInteractions";

// Components //
import Text from "shared/Text";

const Root = styled.div`
  padding: 8px;
`;

const Wrapper = styled.div`
  flex-direction: row;
  align-items: flex-start;
  padding: 20px 16px 20px 24px;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  ${listItemInteractions}
`;

const IconCol = styled.div`
  margin-right: 24px;
  align-items: flex-start;
`;

const Icon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.gray};
`;

const Content = styled.div`
  flex: 1;
  margin-right: 16px;
  & > ${Text} {
    user-select: none;
  }
  & > ${Text} + ${Text} {
    margin-top: 4px;
  }
`;

const Chevron = styled(Icon)`
  align-self: center;
  width: 16px;
  height: 16px;
`;

export default ({ active, title, text }) => (
  <Root {...{ active }} activeColor="light_gray">
    <Wrapper>
      <IconCol>
        <Icon />
      </IconCol>
      <Content>
        <Text weight="500">{title}</Text>
        <Text weight="400" size={12} faded>
          {text}
        </Text>
      </Content>
      <Chevron />
    </Wrapper>
  </Root>
);
