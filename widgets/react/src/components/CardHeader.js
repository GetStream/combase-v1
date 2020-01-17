import React from "react";
import styled from "styled-components";

// Components //
import Fill from "components/Fill";
import Text from "components/Text";

const Root = styled.div`
  padding: 20px 24px 12px 24px;
  flex-direction: row;
  align-items: flex-end;
`;

const CardHeader = ({ children, title = "Title" }) => {
  return (
    <Root>
      <Text weight="500">{title}</Text>
      <Fill />
      {children}
    </Root>
  );
};

export default CardHeader;
