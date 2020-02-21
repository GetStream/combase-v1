import React from "react";
import PropTypes from "prop-types";
import styled, { withTheme } from "styled-components";
import ContentLoader from 'react-content-loader';

// Components //
import Text from "shared/Text";

const Root = styled.div`
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
`;

const Content = styled.div`
  margin-left: ${({ hasIcon }) => (hasIcon ? 16 : 0)}px;
`;

const ListItem = ({ icon: Icon, theme, title, value }) => {
  if (!title || !value) {
    return (
      <ContentLoader
        speed={2}
        width={325}
        height={49}
        viewBox="0 0 325 49"
        backgroundColor={theme.color.placeholder}
        foregroundColor={theme.color.placeholder_shimmer}
      >
        <circle cx="28" cy="21" r="12" />
        <rect x="56" y="8" rx="3" ry="3" width="56" height="8" />
        <rect x="56" y="18" rx="4" ry="4" width="120" height="12" />
      </ContentLoader>
    )
  }
  return (
    <Root>
      {Icon ? <Icon color="primary" /> : null}
      <Content hasIcon={!!Icon}>
        <Text size={8} color="primary" weight="600">
          {title}
        </Text>
        <Text size={12}>{value}</Text>
      </Content>
    </Root>
  );
};

ListItem.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  title: PropTypes.string,
  value: PropTypes.string
};

export default withTheme(ListItem);
