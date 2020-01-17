import React from "react";
import styled from "styled-components";

// Assets //
import BubbleBg from "assets/bubbles.svg";

// Components //
import Container from "components/Container";
import Text from "components/Text";

const Root = styled.div`
  height: 232px;
  background-color: ${({ theme }) => theme.color.primary};
  overflow: hidden;
`;

const Wrapper = styled(Container)`
  flex: 1;
  align-items: flex-start;
  justify-content: flex-end;
  padding-bottom: 72px;
`;

const Content = styled.div`
  padding: 0px 24px;
  & > ${Text} {
    margin-bottom: 24px;
  }
`;

const Background = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
`;

const Header = () => {
  return (
    <Root>
      <Background src={BubbleBg} />
      <Wrapper>
        <Content>
          <Text size={24} color="white" weight="500">
            Welcome, Luke{" "}
            <span role="img" aria-label="Wave">
              👋
            </span>
          </Text>
        </Content>
      </Wrapper>
    </Root>
  );
};

export default Header;
