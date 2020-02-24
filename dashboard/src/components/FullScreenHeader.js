import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

// Hooks //
import useMedia from "hooks/useMedia";

// Components //
import Container from "shared/Container";
import Text from "shared/Text"
import MobileHeader from "components/MobileHeader";

const Root = styled.div`
  background-color: ${({ theme }) => theme.color.primary};
  & > ${Container} {
    padding-top: 8px;
    padding-bottom: 152px;

    @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
      padding-top: 72px;
    }
  }
`;

const Content = styled.div`
  padding: 0px 8px;
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
    padding: 0px 24px;
  }
  & > * + * {
    margin-top: 8px;
  }
`;

const PageIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.white};
  justify-content: center;
  align-items: center;
`;

const Description = styled(Text)`
  max-width: 360px;
`;

const FullScreenHeader = ({ icon: Icon, text, title }) => {
  const isMobile = useMedia("sm");
  return (
    <Root>
      {isMobile ? (
        <MobileHeader color="white" />
      ) : null}
      <Container>
        <Content>
          <PageIcon>
            {Icon ? <Icon size={24} color="primary" /> : null}
          </PageIcon>
          <Text color="white" size={32} weight="600">
            {title}
          </Text>
          <Description color="white" faded>
            {text}
          </Description>
        </Content>
      </Container>
    </Root>
  );
};

FullScreenHeader.propTypes = {
  icon: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default FullScreenHeader;
