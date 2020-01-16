import React from "react";
import styled from "styled-components";
import moment from "moment";

// Components //
import Avatar from "components/Avatar";
import Fill from "components/Fill";
import Text from "components/Text";

const Root = styled.div`
  flex-direction: row;
  align-items: center;
  padding: 12px 24px;
`;

const Content = styled.div`
  margin-left: 16px;
  flex: 1;
`;

const Row = styled.div`
  flex-direction: row;
  align-items: center;
`;

const ThreadItem = () => (
  <Root>
    <Avatar size={48} />
    <Content>
      <Row>
        <Text weight="500">Luke S.</Text>
        <Fill />
        <Text faded size={12}>
          {moment().format("hh:mma")}
        </Text>
      </Row>
      <Row>
        <Text faded size={12}>
          Latest Message
        </Text>
      </Row>
    </Content>
  </Root>
);

export default ThreadItem;
