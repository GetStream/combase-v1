import React from "react";
import styled from "styled-components";

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

const Content = styled(Container)``;

export default () => {
  return (
    <Root>
      <Header>
        <Avatar size={136} name="Nick" />
        <Text size={24} weight="600">
          Nick Parsons
        </Text>
        <Text size={12} faded weight="400">
          Active Now
        </Text>
      </Header>
      <Content>
        <ClearbitWidget email="nick@getstream.io" />
        <EmailVerificationWidget email="nick@getstream.io" />
      </Content>
    </Root>
  );
};
