import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import Chat, { MessagesList } from '@comba.se/chat';
import Animated from 'animated/lib/targets/react-dom';

// Hooks //
import { useAuth } from 'contexts/Auth';
import useChatForm from 'hooks/useChatForm';

// Components //
import InputToolbar from 'components/InputToolbar';

const Root = styled(Animated.div)`
    flex: 1;
    height: 100%;
    & > div {
        height: 100%;
    }
`;

const HeaderSpacer = styled.div`
    flex: 0 0 64px;
`;

const Thread = ({ history, match, transitionAnim, ...props }) => {
    const { params: { channelId } } = match;

    const { user, createChat, createUser } = useAuth();
    const handleSubmit = useCallback(async ({ initialMessage, ...values }) => {
        try {
            const user = await createUser(values);
            const data = await createChat(user, initialMessage);
            console.log('chat created', data._id, 'initial message: ', initialMessage);
            history.push(`/${data._id}`);
        } catch (error) {
            // TODO: Error handling 
            console.log(error);
        }
    }, [createUser]);

    const [messages, onSend] = useChatForm(handleSubmit);

    const messagesStyle = useMemo(() => ({
        height: 'calc(100% - 128px)',
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
                onSend={onSend}
                channelId={channelId}
                user={user}
            >
                <HeaderSpacer />
                <Animated.div style={messagesStyle}>
                    <MessagesList messages={match.params.channelId === 'new' ? messages : undefined} />
                </Animated.div>
                <Animated.div style={toolbarStyle}>
                    <InputToolbar />
                </Animated.div>
            </Chat>
        </Root >
    );
};

export default Thread;