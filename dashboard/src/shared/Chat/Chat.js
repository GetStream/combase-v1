import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Components //
import InputToolbar from './InputToolbar';
import uuid from 'uuid';

const Root = styled.div`
    flex: 1;
`;

const List = styled.div`
    flex: 1;
`;

class Chat extends Component {
    static propTypes = {
        placeholder: PropTypes.string,
        textInputProps: PropTypes.object,
        user: PropTypes.object,
    };

    static defaultProps = {
        placeholder: 'Write something...',
    };

    state = {
        text: '',
    };

    onInputTextChanged = text =>
        this.setState({
            text,
        });

    onSend = (messages = [], shouldResetInputToolbar = false) => {
        const { onSend, user } = this.props;
        if (!Array.isArray(messages)) {
            messages = [messages];
        }
        const newMessages = messages.map(message => {
            return {
                ...message,
                user,
                created_at: new Date(),
            };
        });

        if (shouldResetInputToolbar === true) {
            this.resetInputToolbar();
        }

        if (onSend) {
            onSend(newMessages);
        }
    };

    renderMessagesList = () => {
        return <List />;
    };

    renderInputToolbar = () => {
        const { text } = this.state;
        const { placeholder, textInputProps } = this.props;
        const { onInputTextChanged, onSend } = this;

        const props = {
            text,
            onSend,
            onTextChanged: onInputTextChanged,
            placeholder,
            textInputProps: {
                ...textInputProps,
                ref: input => (this.textInput = input),
            },
        };

        return <InputToolbar {...props} />;
    };

    resetInputToolbar = () => {
        if (this.textInput) {
            this.textInput.value = '';
        }
        this.setState({
            text: '',
        });
    };

    setActionsOpen = actionsOpen =>
        this.setState({
            actionsOpen,
        });

    render() {
        return (
            <Root>
                {this.renderMessagesList()}
                {this.renderInputToolbar()}
            </Root>
        );
    }
}

export default Chat;
