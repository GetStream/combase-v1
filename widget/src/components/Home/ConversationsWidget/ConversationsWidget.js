import React from 'react';
import styled from 'styled-components';
import { Card } from "@comba.se/ui";
import { InboxIcon } from "@comba.se/ui/Icons";
import { useChatClient } from 'stream-chat-hooks';
import { ThreadItem } from '@comba.se/chat';

// Components //
import CardHeader from 'components/CardHeader';
import CardFooter from 'components/CardFooter';

const Root = styled(Card)`
    width: 100%;  
`;

const List = styled.div`
    margin-top: 8px;
`

const ThreadsWidget = ({ className }) => {
    const client = useChatClient();
    console.log(client);
    return (
        <Root {...{ className }}>
            <CardHeader icon={InboxIcon} title="Conversations" />
            <List>
                <ThreadItem />
                <ThreadItem />
                <ThreadItem />
            </List>
            <CardFooter />
        </Root>
    );
};

export default ThreadsWidget;