import React from "react";
import styled from "styled-components";

// Components //
import MenuButton from "components/MenuButton";

const Root = styled.div`
  padding: 16px;
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
    padding: 24px;
  }
`;

const TitleWrapper = styled.div`
  padding: 0px 8px;
  margin-bottom: 16px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Icon = styled.div`
  background-color: ${({ theme }) => theme.color.gray};
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;

const Title = styled.div`
  flex-direction: row;
  align-items: center;
  & > p {
    margin-left: 8px;
    font-size: 24px;
  }
`;

const Actions = styled.div`
  flex-direction: row;
  align-items: center;
  & > * + * {
    margin-left: 16px;
  }
`;

const SearchWrapper = styled.div``;

const Search = styled.div`
  background-color: ${({ theme }) => theme.color.light_gray};
  border-radius: 8px;
  height: 40px;
`;

export default () => {
  return (
    <Root>
      <TitleWrapper>
        <Title>
          <MenuButton />
          <Icon />
          <p>Inbox</p>
        </Title>
        <Actions>
          <Icon />
          <Icon />
        </Actions>
      </TitleWrapper>
      <SearchWrapper>
        <Search />
      </SearchWrapper>
    </Root>
  );
};
