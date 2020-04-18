import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button, Card, EmptyState, FAB } from "@comba.se/ui";
import { ThreadItem } from '@comba.se/chat';

// Hooks //
import { useAuth } from 'contexts/Auth';

// Utils //
import request from 'utils/request';

// Components //
import CardHeader from 'components/CardHeader';
import CardFooter from 'components/CardFooter';

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
    const data = null;
    const createNewConversation = useCallback(async () => {
        try {
            await request('v1/chats', 'post', {
                body: JSON.stringify({
                    meta: {
                        subject: "Chat",
                    },
                    refs: {
                        user: user._id,
                        agents: {
                            assignee: {
                                agent: "5e5f50e417fee2bee1092cc5"
                            }
                        },
                        organization: organization._id,
                    },
                })
            });
        } catch (error) {
            console.error(error);
        }
    }, []);

    const renderContent = useCallback(() => {
        if (!user || !data) {
            return 'No User'
        }

        return (
            <List>
                <ThreadItem />
                <ThreadItem />
                <ThreadItem />
            </List>
        );
    }, [data, user]);

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