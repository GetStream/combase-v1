import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

// Components //
import MenuButton from "shared/MenuButton";
import Text from "shared/Text";

const Root = styled.div`
  padding: 16px;
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
    padding: 24px;
  }
`;

const TitleWrapper = styled.div`
  margin-bottom: ${({ showSearch }) => (showSearch ? 16 : 0)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
    padding: 0px 8px;
  }
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
  & > ${Text} {
    margin-left: 8px;
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

const ListHeader = ({ showSearch, title }) => {
  return (
    <Root>
      <TitleWrapper {...{ showSearch }}>
        <Title>
          <MenuButton />
          <Icon />
          <Text size={24} weight="600">
            {title}
          </Text>
        </Title>
        <Actions>
          <Icon />
          <Icon />
        </Actions>
      </TitleWrapper>
      {showSearch ? (
        <SearchWrapper>
          <Search />
        </SearchWrapper>
      ) : null}
    </Root>
  );
};

ListHeader.propTypes = {
  showSearch: PropTypes.bool,
  title: PropTypes.string
};

ListHeader.defaultProps = {
  showSearch: true,
  title: "Title"
};

export default ListHeader;
