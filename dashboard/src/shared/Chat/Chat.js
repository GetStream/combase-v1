import React, { useCallback, useState } from 'react';
import { GiftedChat } from 'react-web-gifted-chat';

// Components //
import Actions from './Actions';
import Bubble from './Bubble';
import Composer from './Composer';
import Day from './Day';
import InputToolbar from './InputToolbar';
import Message from './Message';
import SendButton from './SendButton';
import SystemMessage from './SystemMessage';

const user = { _id: 1 };
const style = { flex: 1 };

const renderActions = props => <Actions {...props} />;
const renderBubble = props => <Bubble {...props} />;
const renderComposer = props => <Composer {...props} />;
const renderDay = props => <Day {...props} />
const renderInputToolbar = props => <InputToolbar {...props} />;
const renderMessage = props => <Message {...props} />;
const renderSend = props => <SendButton {...props} />;
const renderSystemMessage = props => <SystemMessage {...props} />;

const Chat = ({ theme }) => {
    const [messages, setMessages] = useState([{ system: true, text: 'Start of your conversation with Luke S.'}]);
    const handleSend = useCallback((newMessages) => {
        setMessages(GiftedChat.append(messages, newMessages))
    }, [messages]);
    return (
        <GiftedChat
            {...{
                messages,
                renderActions,
                renderBubble,
                renderComposer,
                renderDay,
                renderInputToolbar,
                renderMessage,
                renderSend,
                renderSystemMessage,
            }}
            placeholder="Write something..."
            minComposerHeight={50}
            maxComposerHeight={200}
            onSend={handleSend}
            {...{ user, style }}
        />
    );
};

export default Chat;
