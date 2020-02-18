import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

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

const ListItem = ({ icon: Icon, title, value }) => {
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

export default ListItem;
