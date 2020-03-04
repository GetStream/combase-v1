import React from "react";
import styled, { withTheme } from "styled-components";
import { Route, Link } from "react-router-dom";
import moment from "moment";
import ContentLoader from 'react-content-loader';
import { Avatar, Badge, Chip, Fill, Text } from '@comba.se/ui';

// Styles //
import listItemInteractions from "styles/css/listItemInteractions";

//  Hooks //
import { useChannelListener } from "stream-chat-hooks";

// Components //
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

const renderText = text => {
  if (text.length >= 32) {
    return `${text.slice(0, 32)}...`
  }
  return text
}

const ThreadItemInner = props => {
  const { data, id, match, partner, statusBorder, theme } = props;
  const active = !!match;
  const [unread, latestMessage] = useChannelListener(id, active);

  if (!data || !id || !partner) {
    return (
      <ContentLoader
        speed={2}
        width={375}
        height={80}
        viewBox="0 0 375 80"
        backgroundColor={theme.color.placeholder}
        foregroundColor={theme.color.placeholder_shimmer}
      >
        <circle cx="48" cy="40" r="24" />
        <rect x="88" y="24" rx="4" ry="4" width="134" height="16" />
        <rect x="88" y="44" rx="4" ry="4" width="120" height="12" />
      </ContentLoader>
    );
  }

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
                latestMessage ? latestMessage.created_at : data.createdAt
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
              {latestMessage ? renderText(latestMessage.text) : "No Messages"}
            </LatestMessage>
            <Fill />
            <Chip label="OPEN" color="green" size={8} />
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

export default withTheme(ThreadItem);
