import React from "react";
import styled from "styled-components";

// CSS //
import pageCard from "styles/css/pageCard";

// Components //
import Container from 'shared/Container';
import { ChatIcon } from 'shared/Icons';
import Chat from 'shared/Chat';
import EmptyState from "shared/EmptyState";

const Root = styled.div`
  flex: 1;
  z-index: 2;
  background-color: ${({ theme }) => theme.color.surface};

  & > ${Container} {
    flex: 1;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
    ${pageCard}
  }
`;

const EmptyRoot = styled(Root)`
  justify-content: center;
  align-items: center;
`;

export default ({ match }) => {
  if (!match) {
    return (
      <EmptyRoot>
        <EmptyState icon={ChatIcon} text="Select a thread." />
      </EmptyRoot>
    );
  }

  return (
    <Root>
      <Container maxWidth={840}>
        <Chat />
      </Container>
    </Root>
  );
};
