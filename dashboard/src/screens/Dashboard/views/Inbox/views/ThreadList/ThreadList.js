import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

// Utils //
import LayoutUtil from './LayoutUtil';

// Context //
import ChannelsContext from 'shared/Chat/contexts/Channels';

// Components //
import { ArchiveIcon, FilterIcon, InboxIcon } from 'shared/Icons';
import EmptyState from 'shared/EmptyState';
import IconButton from 'shared/IconButton';
import ListHeader from 'components/ListHeader';
import ListView, { ContextHelper } from 'components/ListView';
import ThreadItem from 'components/ThreadItem';

const Root = styled.div`
    flex: 1;
    order: -1;
    height: 100%;
    background-color: ${({ theme }) => theme.color.background};

    @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
        flex: 0 0 375px;
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

const renderRow = ({ id, data, partner }, index) => {
    return <ThreadItem {...{ id, data, partner }} />;
};

export default props => {
    const [channels, { error, loading }] = useContext(ChannelsContext);
    const [{ width }, onResize] = useState(initialState);
    const [layoutProvider, setLayoutProvider] = useState(
        LayoutUtil.getLayoutProvider(width, 80)
    );
    const [contextProvider] = useState(new ContextHelper('ThreadList'));
    useEffect(() => {
        setLayoutProvider(LayoutUtil.getLayoutProvider(width, 80));
    }, [width]);

    return (
        <Root>
            {!channels.length && error ? (
                <EmptyState text="Error loading threads" />
            ) : (
                <ListView
                    {...{
                        contextProvider,
                        layoutProvider,
                        onResize,
                        renderRow,
                        style,
                    }}
                    data={channels}
                    ListHeaderComponent={renderListHeader}
                    ListEmptyComponent={renderListEmpty}
                    rowCount={channels.length}
                    showEmptyHeader
                />
            )}
        </Root>
    );
};
