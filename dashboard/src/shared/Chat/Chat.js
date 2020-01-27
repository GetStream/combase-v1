import React from 'react';
import { GiftedChat } from 'react-web-gifted-chat';

// Components //
import Actions from './Actions';
import Composer from './Composer';
import InputToolbar from './InputToolbar';
import SendButton from './SendButton';

const user = { _id: 1 };

const renderInputToolbar = props => {
    return <InputToolbar {...props} />;
};

const renderActions = props => {
    return <Actions {...props} />;
};

const renderComposer = props => <Composer {...props} />;

const renderSend = props => <SendButton {...props} />;

const Chat = ({ theme }) => {
    return (
        <GiftedChat
            messages={[]}
            onSend={console.log}
            {...{
                renderActions,
                renderComposer,
                renderInputToolbar,
                renderSend,
            }}
            placeholder="Write something..."
            minComposerHeight={50}
            maxComposerHeight={200}
            style={{ flex: 1 }}
            {...{ user }}
        />
    );
};

export default Chat;
