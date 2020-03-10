import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Animated from "animated/lib/targets/react-dom";
import { Text } from '@comba.se/ui';

// Hooks //
import useMedia from "hooks/useMedia";

// Components //
import MenuButton from "shared/MenuButton";
import ActionsGroup from "shared/ActionsGroup";
import SearchInput from "shared/SearchInput";

const Root = styled(Animated.div)`
  position: sticky;
  top: -56px;
  z-index: 1;
  background-color: ${({ bgColor, theme }) => theme.color[bgColor]};
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
    top: -80px;
  }
`;

const TitleWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 2;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: ${({ bgColor, theme }) => theme.color[bgColor]};
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
    padding: 24px 32px 24px 32px;
  }
`;

const Title = styled.div`
  flex-direction: row;
  align-items: center;
  & > ${Text} {
    margin-left: 8px;
  }
`;

const SearchWrapper = styled.div`
  padding: 0px 16px 16px 16px;
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
    padding: 0px 24px 24px 24px;
  }
`;

const MenuBtn = styled(MenuButton)`
  margin-right: 16px;
`

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

const ListHeader = ({
  bgColor,
  children,
  icon: Icon,
  scrollAnim,
  showSearch,
  title
}) => {
  const style = getShadowStyle(scrollAnim);
  const isMobile = useMedia("sm");
  return (
    <Root {...{ bgColor, style }}>
      <TitleWrapper {...{ bgColor, showSearch }}>
        <Title>
          <MenuBtn />
          {Icon ? <Icon color="text" size={24} /> : null}
          <Text size={isMobile ? 20 : 24} weight="600">
            {title}
          </Text>
        </Title>
        {children ? <ActionsGroup>{children}</ActionsGroup> : null}
      </TitleWrapper>
      {showSearch ? (
        <SearchWrapper>
          <SearchInput />
        </SearchWrapper>
      ) : null}
    </Root>
  );
};

ListHeader.propTypes = {
  bgColor: PropTypes.string,
  showSearch: PropTypes.bool,
  title: PropTypes.string
};

ListHeader.defaultProps = {
  bgColor: "background",
  showSearch: true,
  title: "Title"
};

export default ListHeader;
