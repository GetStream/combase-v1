import React, { useEffect, useState } from "react";
import styled from "styled-components";

// Utils //
import LayoutUtil from "./LayoutUtil";

// Components //
import ListHeader from "components/ListHeader";
import ListView from "components/ListView";
import ThreadItem from "components/ThreadItem";

const Root = styled.div`
  flex: 1;
  order: -1;
  height: 100%;
  background-color: ${({ theme }) => theme.color.background};

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
    flex: 0 0 375px;
  }
`;

const data = [];
const initialState = { height: 0, width: 0 };
const style = { flex: 1 };

const renderRow = () => <ThreadItem />;

export default () => {
  const [{ width }, onResize] = useState(initialState);
  const [layoutProvider, setLayoutProvider] = useState(
    LayoutUtil.getLayoutProvider(width, 72)
  );

  useEffect(() => {
    setLayoutProvider(LayoutUtil.getLayoutProvider(width, 72));
  }, [width]);

  return (
    <Root>
      <ListView
        {...{ data, layoutProvider, onResize, renderRow, style }}
        ListHeaderComponent={ListHeader}
        rowCount={160}
        showEmptyHeader
      />
    </Root>
  );
};
