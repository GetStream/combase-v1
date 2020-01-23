import React, { memo } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import moment from "moment";

// Components //
import Avatar from "components/Avatar";
import Fill from "components/Fill";
import Text from "components/Text";

const Root = styled(Link)`
  padding: 4px 8px;
  position: relative;
  display: flex;
  align-items: stretch;
`;

const Wrapper = styled.div`
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  cursor: pointer;
  background-color: ${({ active, theme }) =>
    theme.colorUtils.fade(theme.color.primary, active ? 0.08 : 0)};
  transition: 0.24s background-color
    ${({ theme }) => theme.easing.css(theme.easing.standard)};

  &:hover {
    background-color: ${({ theme }) =>
      theme.colorUtils.fade(theme.color.primary, 0.04)};
  }

  &:active {
    background-color: ${({ theme }) =>
      theme.colorUtils.fade(theme.color.primary, 0.08)};
  }
`;

const Content = styled.div`
  margin-left: 16px;
  flex: 1;
`;

const Row = styled.div`
  flex-direction: row;
  align-items: center;
`;

const ThreadItem = ({ active = true, statusBorder }) => (
  <Root {...{ active }} to="/inbox/channelId">
    <Wrapper>
      <Avatar size={48} {...{ statusBorder }} />
      <Content>
        <Row>
          <Text weight="500">Luke S.</Text>
          <Fill />
          <Text color="gray" size={12}>
            {moment().format("hh:mma")}
          </Text>
        </Row>
        <Row>
          <Text faded color="slate" size={12} weight="500">
            Latest message
          </Text>
        </Row>
      </Content>
    </Wrapper>
  </Root>
);

export default memo(ThreadItem);
