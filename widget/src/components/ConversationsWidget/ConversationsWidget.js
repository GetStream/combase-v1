import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button, Card, EmptyState, FAB } from "@comba.se/ui";
import { ThreadItem } from '@comba.se/chat';

// Hooks //
import { useAuth } from 'contexts/Auth';
import useChats from 'hooks/useChats'

// Utils //
import request from 'utils/request';

// Components //
import CardHeader from 'components/CardHeader';
import CardFooter from 'components/CardFooter';
import ConversationItem from './ConversationItem';

const Root = styled(Card)`
    width: 100%;  
`;

const List = styled.div`
    margin-top: 8px;
`

const EmptyWrapper = styled.div`
    margin-top: 32px;
    margin-bottom: 32px;
`

const NewConversationBtn = styled(FAB)`
    position: relative;
    bottom: 0;
    right: 0;
    box-shadow: none;
`

const renderThreads = (chats) => chats.length ? chats.map(({ channel: { id, data, partner }, ...rest }, index) => {
    console.log('chat', id, partner, data);
    return (
        <ThreadItem {...{ id, data, partner }} />
    )
}) : <EmptyWrapper><EmptyState text="No Conversations!" /></EmptyWrapper>;

const ConversationsWidget = ({ className }) => {
    const { organization, user } = useAuth();
    const [chats, { loading }] = useChats();

    const renderContent = useCallback(() => {
        if (loading) {
            return (
                <List>
                    <ThreadItem />
                    <ThreadItem />
                    <ThreadItem />
                </List>
            );
        }
        return (
            <List>
                {chats.map((chat) => {
                    return <ConversationItem id={chat._id} />
                })}
            </List>
        );
    }, [chats, loading, user]);

    return (
        <Root {...{ className }}>
            <CardHeader title="Conversations" />
            {renderContent()}
            <CardFooter>
                <Button flat label="See all" />
                <Link to="/channelIdHere">
                    <NewConversationBtn disablePortal size={48} />
                </Link>
            </CardFooter>
        </Root>
    );
};

export default ConversationsWidget;