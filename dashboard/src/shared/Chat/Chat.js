import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Components //
import InputToolbar from './InputToolbar';
import MessagesList from './MessagesList';

const Root = styled.div`
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
        isMounted: false,
        messages: [],
        text: '',
        typingDisabled: false,
    };

    componentDidMount() {
        this.setState({ isMounted: true });
    }

    onInputTextChanged = text => {
        const { typingDisabled } = this.state;
        const { onInputTextChanged } = this.props;
        if (typingDisabled) {
            return;
        }

        if (onInputTextChanged) {
            onInputTextChanged(text);
        }

        this.setState({
            text,
        });
    };

    onSend = (messages = [], shouldResetInputToolbar = false) => {
        const { onSend, user } = this.props;
        const { isMounted } = this.state;
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
            this.setState({ typingDisabled: true });
            this.resetInputToolbar();
        }

        onSend(newMessages);
        this.scrollToBottom();

        if (shouldResetInputToolbar === true) {
            setTimeout(() => {
                if (isMounted === true) {
                    this.setState({ typingDisabled: false });
                }
            }, 100);
        }
    };

    renderMessagesList = () => {
        const { messages } = this.state;
        return (
            <MessagesList
                data={messages}
                setMessageContainerRef={this.setMessageContainerRef}
            />
        );
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

    scrollToBottom = (animated = true) => {
        if (this.messageContainerRef !== null) {
            this.messageContainerRef.scrollTo({
                y: 0,
                animated,
            });
        }
    };

    setActionsOpen = actionsOpen =>
        this.setState({
            actionsOpen,
        });

    setMessageContainerRef = el => {
        this.messageContainerRef = el;
    };

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
