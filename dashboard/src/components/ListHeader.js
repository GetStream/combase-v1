import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Animated from "animated/lib/targets/react-dom";

// Components //
import MenuButton from "shared/MenuButton";
import Text from "shared/Text";

const Root = styled(Animated.div)`
  position: sticky;
  top: 0;
  padding: 16px;
  z-index: 1;
  background-color: ${({ theme }) => theme.color.background};
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

let interpolation;

const getShadowStyle = scrollAnim => {
  if (!scrollAnim) {
    return null;
  }

  if (!interpolation) {
    interpolation = scrollAnim.interpolate({
      inputRange: [0, 48],
      outputRange: [0, 0.12],
      extrapolate: "clamp"
    });
  }

  return {
    boxShadow: Animated.template`0px 4px 24px rgba(0, 0, 0, ${interpolation})`
  };
};

const ListHeader = ({ scrollAnim, showSearch, title }) => {
  const style = getShadowStyle(scrollAnim);

  return (
    <Root {...{ style }}>
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
