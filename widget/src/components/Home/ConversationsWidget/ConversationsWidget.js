import React from 'react';
import styled from 'styled-components';
import { Card } from "@comba.se/ui";
import { InboxIcon } from "@comba.se/ui/Icons";
import { ThreadItem } from '@comba.se/chat';

// Hooks //
import useChats from 'hooks/useChats';

// Components //
import CardHeader from 'components/CardHeader';
import CardFooter from 'components/CardFooter';

const Root = styled(Card)`
    width: 100%;  
`;

const List = styled.div`
    margin-top: 8px;
`

const renderThreads = (chats) => chats.map(({ channel: { id, data, partner }, ...rest }, index) => {
    console.log('chat', id, partner, data);
    return (
        <ThreadItem {...{ id, data, partner }} />
    )
});

const ThreadsWidget = ({ className }) => {
    const [chats, { error, loading }] = useChats();
    console.log(loading, chats)
    return (
        <Root {...{ className }}>
            <CardHeader icon={InboxIcon} title="Conversations" />
            <List>
                {!loading ? renderThreads(chats) : (
                    <>
                        <ThreadItem />
                        <ThreadItem />
                        <ThreadItem />
                    </>
                )}
            </List>
            <CardFooter />
        </Root>
    );
};

export default ThreadsWidget;