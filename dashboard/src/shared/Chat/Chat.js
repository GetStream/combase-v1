import React, { useCallback, useState } from 'react';
import { GiftedChat } from 'react-web-gifted-chat';

// Components //
import Actions from './Actions';
import Composer from './Composer';
import InputToolbar from './InputToolbar';
import SendButton from './SendButton';

const user = { _id: 1 };
const style = { flex: 1 };

const renderInputToolbar = props => <InputToolbar {...props} />;
const renderActions = props => <Actions {...props} />;
const renderComposer = props => <Composer {...props} />;
const renderSend = props => <SendButton {...props} />;

const Chat = ({ theme }) => {
    const [messages, setMessages] = useState([]);
    const handleSend = useCallback((newMessages) => {
        setMessages(GiftedChat.append(messages, newMessages))
    }, [messages]);
    return (
        <GiftedChat
            {...{
                messages,
                renderActions,
                renderComposer,
                renderInputToolbar,
                renderSend,
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
