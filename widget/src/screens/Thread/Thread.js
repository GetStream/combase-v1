import React from 'react';
import styled from 'styled-components';
import Chat, { MessagesList } from '@comba.se/chat';

// Hooks //
import { useAuth } from 'contexts/Auth';

// Components //
import InputToolbar from 'components/InputToolbar';

const Root = styled.div`
    flex: 1;
`;

const Thread = ({ match, ...props }) => {
    const { params: { channelId } } = match;
    const { user } = useAuth();
    console.log('channel id', channelId);
    return (
        <Root>
            <Chat
                channelId={channelId}
                user={user}
            >
                <MessagesList />
                <InputToolbar />
            </Chat>
        </Root>
    );
};

export default Thread;