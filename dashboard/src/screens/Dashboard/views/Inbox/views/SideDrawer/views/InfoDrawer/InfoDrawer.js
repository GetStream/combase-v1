import React from "react";
import PropTypes from 'prop-types';
import styled from "styled-components";
import moment from 'moment';

// Widgets //
import ClearbitWidget from "widgets/Clearbit/EnrichmentWidget";
import EmailVerificationWidget from "widgets/BlazeVerify/EmailVerificationWidget";

// Components //
import Avatar from "shared/Avatar";
import Container from "shared/Container";
import Text from "shared/Text";

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
    margin-top: 16px;
  } 
`;

// TODO: Use live email of user. Need to set as custom data
// on their stream user.
const InfoDrawer = ({ partner }) => {
  console.log(partner);
  return (
    <Root>
      <Header>
        <Avatar size={136} name="Nick" showStatus={partner.online} />
        <Text size={24} weight="600">
          {partner.name}
        </Text>
        <Text size={12} faded weight="400">
          {partner.online ? 'Active Now' : `Last active: ${moment(partner.last_active).fromNow()}`}
        </Text>
      </Header>
      <Content>
        <EmailVerificationWidget email="nick@getstream.io" />
        <ClearbitWidget email="nick@getstream.io" />
      </Content>
    </Root>
  );
};

InfoDrawer.propTypes = {
  partner: PropTypes.object.isRequired,
}

export default InfoDrawer;