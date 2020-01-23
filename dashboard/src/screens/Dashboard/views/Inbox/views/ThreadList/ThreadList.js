import React, { useEffect, useState } from "react";
import styled from "styled-components";

// Utils //
import LayoutUtil from "./LayoutUtil";

// Components //
import EmptyState from "shared/EmptyState";
import ListHeader from "components/ListHeader";
import ListView, { ContextHelper } from "components/ListView";
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

const renderListEmpty = () => <EmptyState text="No Threads" />;
const renderListHeader = props => <ListHeader {...props} title="Inbox" />;
const renderRow = () => <ThreadItem statusBorder="background" />;

export default () => {
  const [{ width }, onResize] = useState(initialState);
  const [layoutProvider, setLayoutProvider] = useState(
    LayoutUtil.getLayoutProvider(width, 80)
  );
  const [contextProvider] = useState(new ContextHelper("ThreadList"));

  useEffect(() => {
    setLayoutProvider(LayoutUtil.getLayoutProvider(width, 80));
  }, [width]);

  return (
    <Root>
      <ListView
        {...{
          contextProvider,
          data,
          layoutProvider,
          onResize,
          renderRow,
          style
        }}
        ListHeaderComponent={renderListHeader}
        ListEmptyComponent={renderListEmpty}
        rowCount={40}
        showEmptyHeader
      />
    </Root>
  );
};
