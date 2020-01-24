import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

// Components //
import Container from "shared/Container";
import Text from "shared/Text";

const Root = styled.div`
  padding: 72px 0px 152px 0px;
  background-color: ${({ theme }) => theme.color.primary};
`;

const Content = styled.div`
  padding: 0px 24px;
  & > * + * {
    margin-top: 8px;
  }
`;

const PageIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.surface};
`;

const Description = styled(Text)`
  max-width: 360px;
`;

const FullScreenHeader = ({ icon: Icon }) => {
  return (
    <Root>
      <Container>
        <Content>
          <PageIcon>
            {Icon ? <Icon size={24} color="primary" /> : null}
          </PageIcon>
          <Text color="surface" size={32} weight="600">
            Plugins
          </Text>
          <Description color="surface" faded>
            Powerful apps and integrations to acquire, engage and retain more
            customers with Comba.
          </Description>
        </Content>
      </Container>
    </Root>
  );
};

FullScreenHeader.propTypes = {
  icon: PropTypes.func.isRequired
};

export default FullScreenHeader;
