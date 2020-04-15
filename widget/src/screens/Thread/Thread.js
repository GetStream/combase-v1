import React from 'react';
import styled from 'styled-components';
import Chat, { MessagesList, InputToolbar } from '@comba.se/chat';

// Hooks //
import { useAuth } from 'contexts/Auth';

// Components //
const Root = styled.div`
    flex: 1;
`;

const Thread = ({ channelId, ...props }) => {
    const { user } = useAuth();
    console.log(channelId, user);
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