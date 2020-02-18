import React from "react";
import styled from "styled-components";
import { Route, Link } from "react-router-dom";
import moment from "moment";

// Styles //
import listItemInteractions from "styles/css/listItemInteractions";

//  Hooks //
import { useChannelListener } from "stream-chat-hooks";

// Components //
import Avatar from "shared/Avatar";
import Badge from "shared/Badge";
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

const LatestMessage = styled(Text)``;

const ThreadItemInner = props => {
  const { data, id, match, partner, statusBorder } = props;

  const active = !!match;
  const [unread, latestMessage] = useChannelListener(id, active);
  return (
    <Root to={`/inbox/${id}`}>
      <Wrapper {...{ active }}>
        <Avatar
          name={partner.name}
          src={partner.image}
          size={48}
          showStatus={unread > 0 || partner.online}
          statusComponent={unread > 0 ? Badge : null}
          statusProps={{ count: unread }}
          {...{ statusBorder }}
        />
        <Content>
          <Row>
            <Text weight="500">{partner.name}</Text>
            <Fill />
            <Text color="gray" size={12}>
              {moment(
                latestMessage ? latestMessage.created_at : data.created_at
              ).calendar()}
            </Text>
          </Row>
          <Row>
            <LatestMessage
              faded={unread === 0}
              color="slate"
              size={12}
              weight="500"
            >
              {latestMessage ? latestMessage.text : "No Messages"}
            </LatestMessage>
          </Row>
        </Content>
      </Wrapper>
    </Root>
  );
};

const renderItem = props => <ThreadItemInner {...props} />;

const ThreadItem = props => {
  return (
    <Route
      path={`/inbox/${props.id}`}
      children={routeProps => renderItem({ ...props, ...routeProps })}
    />
  );
};

export default ThreadItem;
