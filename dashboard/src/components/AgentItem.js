import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Text } from '@comba.se/ui';

// Styles //
import listItemInteractions from "styles/css/listItemInteractions";

// Components //
import UserBlock from "shared/UserBlock";

const Root = styled.div`
    padding: 0px 16px;
    flex-direction: row;
    align-items: center;
    height: 80px;
    cursor: pointer;
    ${listItemInteractions}
    & ${Text} {
        user-select: none;
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
        padding: 0px 40px;
    }

`;
const AgentItem = ({ _id, email, image, name }) => {
  const [dims, setDims] = useState(null);
  const rootRef = useCallback(el => {
    if (el) {
      setDims(el.getBoundingClientRect());
    }
  }, []);
  const to = useMemo(
    () => ({
      pathname: `/agents/${_id}`,
      startDims: dims
    }),
    [dims, _id]
  );
  return (
    <Link {...{ to }}>
      <Root ref={rootRef}>
        <UserBlock {...{ name }} avatar={image} meta={email} />
      </Root>
    </Link>
  );
};

export default AgentItem;
