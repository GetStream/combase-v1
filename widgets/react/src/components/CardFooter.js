import React from "react";
import styled from "styled-components";

// Components //
import Fill from "components/Fill";
import Text from "components/Text";

const Root = styled.div`
  padding: 12px 16px;
  flex-direction: row;
`;

const CardFooter = () => (
  <Root>
    <Fill />
    <Text color="primary" size={12}>
      View All
    </Text>
  </Root>
);

export default CardFooter;
