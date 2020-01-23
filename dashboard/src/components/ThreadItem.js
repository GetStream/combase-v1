import React, { memo } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import moment from "moment";

// Components //
import Avatar from "components/Avatar";
import Fill from "components/Fill";
import Text from "components/Text";

const Root = styled(Link)`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
    padding: 12px 24px;
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

const ThreadItem = ({ statusBorder }) => (
  <Root to="/inbox/channelId">
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
  </Root>
);

export default memo(ThreadItem);
