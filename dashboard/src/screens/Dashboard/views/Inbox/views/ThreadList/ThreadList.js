import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IconButton } from '@comba.se/ui';
import { ArchiveIcon, FilterIcon, InboxIcon } from "@comba.se/ui/Icons";

// Utils //
import LayoutUtil from "./LayoutUtil";

// Hooks//
import useChats from "hooks/useChats";

// Components //
import EmptyState from "shared/EmptyState";
import ListHeader from "shared/ListHeader";
import ListView, { ContextHelper } from "components/ListView";
import ThreadItem from "components/ThreadItem";

const Root = styled.div`
  flex: 1;
  order: -1;
  height: 100%;
  background-color: ${({ theme }) => theme.color.background};

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
    width: 375px;
    position: fixed;
    top: 0;
    left: 96px;
    right: 0;
    bottom: 0;
  }
`;

const initialState = { height: 0, width: 0 };
const style = { flex: 1 };

const renderListEmpty = () => <EmptyState text="No Threads" />;
const renderListHeader = props => (
  <ListHeader {...props} icon={InboxIcon} title="Inbox">
    <IconButton icon={ArchiveIcon} color="alt_text" />
    <IconButton icon={FilterIcon} color="alt_text" />
  </ListHeader>
);

const renderRow = ({ channel: { id, data, partner }, ...rest }, index) => {
  return <ThreadItem {...{ id, data, partner }} />;
};

const ListLoadingComponent = () => {
  return (
    <>
      <ThreadItem />
      <ThreadItem />
      <ThreadItem />
      <ThreadItem />
      <ThreadItem />
      <ThreadItem />
    </>
  )
}

export default props => {
  const [chats, { loading, error }] = useChats();
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
      {error ? (
        <EmptyState text="Error loading threads" />
      ) : (
          <ListView
            {...{
              contextProvider,
              layoutProvider,
              ListLoadingComponent,
              onResize,
              renderRow,
              style
            }}
            loading={loading && !chats.length}
            data={chats}
            ListHeaderComponent={renderListHeader}
            ListEmptyComponent={renderListEmpty}
            rowCount={chats.length}
            showEmptyHeader
          />
        )}
    </Root>
  );
};
