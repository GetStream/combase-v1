import React, { memo } from "react";
import styled from "styled-components";
import { Route, Link } from "react-router-dom";
import moment from "moment";

// Styles //
import listItemInteractions from "styles/css/listItemInteractions";

// Components //
import Avatar from "shared/Avatar";
import Fill from "shared/Fill";
import Text from "shared/Text";

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
  ${listItemInteractions}
`;

const Content = styled.div`
  margin-left: 16px;
  flex: 1;
`;

const Row = styled.div`
  flex-direction: row;
  align-items: center;
`;

const renderItem = ({ index, match: active, statusBorder }) => (
  <Root to={`/inbox/${index}`}>
    <Wrapper {...{ active }}>
      <Avatar name="Luke S." size={48} {...{ statusBorder }} />
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

const ThreadItem = (props) => (
  <Route path={`/inbox/${props.index}`} children={(routeProps) => renderItem({...props, ...routeProps})} />
);

export default memo(ThreadItem);
