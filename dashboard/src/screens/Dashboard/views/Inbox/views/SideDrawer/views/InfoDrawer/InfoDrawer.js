import React, { useMemo } from "react";
import PropTypes from 'prop-types';
import styled from "styled-components";
import moment from 'moment';
import { Avatar, Container, Text } from '@comba.se/ui';

// Hooks //
import useActivePlugins from 'hooks/useActivePlugins';
import { useActiveChannel } from 'stream-chat-hooks';

// Widgets //
import ChatDataWidget from 'widgets/Combase/ChatDataWidget';
import ClearbitWidget from "widgets/Clearbit/EnrichmentWidget";
import EmailVerificationWidget from "widgets/BlazeVerify/EmailVerificationWidget";

// Components //
const Root = styled.div`
  overflow-y: scroll;
  padding-bottom: 40px;
`;

const Header = styled.div`
  padding: 64px 16px;
  justify-content: center;
  align-items: center;

  & > ${Text}:first-of-type {
    margin-top: 16px;
  }

  & ${Text} + ${Text} {
    margin-top: 4px;
  }
`;

const Content = styled(Container)`
  & > * + * {
    margin-top: 24px;
  } 
`;

// TODO: Use live email of user. Need to set as custom data
// on their stream user.
const InfoDrawer = ({ channelId, partner, ...props }) => {
  const channel = useActiveChannel(channelId);
  const [plugins] = useActivePlugins();
  const enabledWidgets = useMemo(() => {
    if (plugins) {
      return Object.values(plugins).filter(({ enabled }) => enabled).map(({ name }) => name);
    }
  }, [plugins]);
  return (
    <Root>
      <Header>
        <Avatar size={136} name={partner.name} showStatus={partner.online} />
        <Text size={24} weight="600">
          {partner.name}
        </Text>
        <Text size={12} faded weight="400">
          {partner.online ? 'Active Now' : `Last active: ${moment(partner.last_active).fromNow()}`}
        </Text>
      </Header>
      <Content key={partner.id}>
        <ChatDataWidget partnerId={partner.id} createdAt={channel.created_at} />
        {enabledWidgets.includes('blaze_verify') ? <EmailVerificationWidget email="nick@getstream.io" /> : null}
        {enabledWidgets.includes('clearbit') ? <ClearbitWidget email="nick@getstream.io" /> : null}
      </Content>
    </Root>
  );
};

InfoDrawer.propTypes = {
  partner: PropTypes.object.isRequired,
}

export default InfoDrawer;