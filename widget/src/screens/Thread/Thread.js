import React, { useMemo } from 'react';
import styled from 'styled-components';
import Chat, { MessagesList } from '@comba.se/chat';
import Animated from 'animated/lib/targets/react-dom';

// Hooks //
import { useAuth } from 'contexts/Auth';

// Components //
import InputToolbar from 'components/InputToolbar';

const Root = styled(Animated.div)`
    flex: 1;
`;

const Thread = ({ match, transitionAnim, ...props }) => {
    const { params: { channelId } } = match;
    const { user } = useAuth();
    console.log('channel id', channelId);
    const messagesStyle = useMemo(() => ({
        flex: 1,
        transform: [
            {
                scale: transitionAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [.95, 1],
                })
            }
        ],
        opacity: transitionAnim
    }), [transitionAnim]);
    const toolbarStyle = useMemo(() => ({
        transform: [
            {
                translateY: transitionAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['100%', '0%']
                })
            }
        ]
    }), [transitionAnim]);
    return (
        <Root>
            <Chat
                onSend={console.log}
                channelId={channelId}
                user={user}
            >
                <Animated.div style={messagesStyle}>
                    <MessagesList />
                </Animated.div>
                <Animated.div style={toolbarStyle}>
                    <InputToolbar />
                </Animated.div>
            </Chat>
        </Root >
    );
};

export default Thread;