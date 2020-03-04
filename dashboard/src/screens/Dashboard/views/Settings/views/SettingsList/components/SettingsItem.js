import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Text } from '@comba.se/ui';
import { ChevronRightIcon } from "@comba.se/ui/Icons";

// Styles //
import listItemInteractions from "styles/css/listItemInteractions";

// Components //
const Root = styled.div`
  padding: 8px;
  pointer-events: ${({ active }) => active ? 'none' : 'auto'};
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

const Chevron = styled(ChevronRightIcon)`
  align-self: center;
`;

export default ({ active, icon: Icon, title, to, text }) => (
  <Link {...{ to }}>
    <Root {...{ active }}>
      <Wrapper {...{ active }} activeColor="alt_text">
        <IconCol>{Icon ? <Icon color="alt_text" /> : null}</IconCol>
        <Content>
          <Text weight="500" color="alt_text">
            {title}
          </Text>
          <Text weight="400" color="alt_text" size={12} faded>
            {text}
          </Text>
        </Content>
        <Chevron color="gray" />
      </Wrapper>
    </Root>
  </Link>
);
