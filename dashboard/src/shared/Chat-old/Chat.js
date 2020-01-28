import React, { useCallback, useEffect, useState } from 'react';
import { GiftedChat } from 'react-web-gifted-chat';
import uuid from 'uuid/v4';

// Components //
import Avatar from 'shared/Avatar';
import Actions from './Actions';
import Bubble from './Bubble';
import Composer from './Composer';
import Day from './Day';
import InputToolbar from './InputToolbar';
import Message from './Message';
import SendButton from './SendButton';
import SystemMessage from './SystemMessage';

const user = { id: 1, name: 'Luke' };
const otherUser = { id: 2, name: "Nick" };
const style = { flex: 1 };

const renderActions = props => <Actions {...props} />;
const renderAvatar = props => <Avatar {...props} />;
const renderBubble = props => <Bubble {...props} />;
const renderComposer = props => <Composer {...props} />;
const renderDay = props => <Day {...props} />;
const renderInputToolbar = props => <InputToolbar {...props} />;
const renderMessage = props => <Message {...props} />;
const renderSend = props => <SendButton {...props} />;
const renderSystemMessage = props => <SystemMessage {...props} />;

const Chat = ({ theme }) => {
    const [actionsOpen, setActionsOpen] = useState(false);
    const [actionsWidth, setActionsWidth] = useState(0);

    const [messages, setMessages] = useState([
        { id: 0, system: true, text: 'Start of your conversation with Luke S.' },
    ]);

    const handleSend = useCallback(
        newMessages => {
            newMessages = newMessages.map(({ text }) => ({
                id: uuid(),
                text,
                created_at: new Date().toISOString(),
                user,
            }));

            setMessages(GiftedChat.append(messages, newMessages));
        },
        [messages]
    );

    return (
        <GiftedChat
            {...{
                actionsOpen,
                messages,
                renderAvatar,
                renderActions,
                renderBubble,
                renderComposer,
                renderDay,
                renderInputToolbar,
                renderMessage,
                renderSend,
                renderSystemMessage,
                setActionsOpen,
                setActionsWidth,
            }}
            actionsWidth={actionsWidth}
            placeholder="Write something..."
            composerHeight={77}
            minInputToolbarHeight={77}
            onSend={handleSend}
            {...{ user, style }}
        />
    );
};

export default Chat;
