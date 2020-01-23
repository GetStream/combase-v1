import React, { useEffect, useState } from "react";
import styled from "styled-components";

// Hooks //
import useMedia from "hooks/useMedia";

// Utils //
import LayoutUtil from "./LayoutUtil";

// Components //
import EmptyState from "components/EmptyState";
import ListHeader from "components/ListHeader";
import ListView from "components/ListView";
import ThreadItem from "components/ThreadItem";
import Header from "components/Header";

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
const renderListHeader = () => <ListHeader title="Inbox" />;
const renderRow = () => <ThreadItem statusBorder="background" />;

export default () => {
  const isMobile = useMedia("sm");
  const [{ width }, onResize] = useState(initialState);
  const [layoutProvider, setLayoutProvider] = useState(
    LayoutUtil.getLayoutProvider(width, 72)
  );

  useEffect(() => {
    setLayoutProvider(LayoutUtil.getLayoutProvider(width, 72));
  }, [width]);

  return (
    <Root>
      {/* {isMobile ? <Header /> : null} */}
      <ListView
        {...{ data, layoutProvider, onResize, renderRow, style }}
        ListHeaderComponent={renderListHeader}
        ListEmptyComponent={renderListEmpty}
        rowCount={40}
        showEmptyHeader
      />
    </Root>
  );
};
