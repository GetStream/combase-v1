import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { IconBubble, Text } from '@comba.se/ui';

// Components //
const Root = styled.div`
  padding: 16px 0px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
    padding: 16px;
  }
`;

const TitleBlock = styled.div`
  flex-direction: row;
  align-items: center;
`;

const Content = styled.div`
  margin-left: 24px;
`;

const SettingsListItem = ({ children, color, icon, text, title }) => (
  <Root>
    <TitleBlock>
      <IconBubble {...{ color, icon }} />
      <Content>
        <Text weight="500">{title}</Text>
        <Text faded color="alt_text" size={12}>
          {text}
        </Text>
      </Content>
    </TitleBlock>
    {children}
  </Root>
);

SettingsListItem.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.func,
  text: PropTypes.string,
  title: PropTypes.string
};

export default SettingsListItem;
