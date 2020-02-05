import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import uuid from 'uuid/v4';

// Components //
import ChatHeader from './ChatHeader';
import InputToolbar from './InputToolbar';
import MessagesList from './MessagesList';

const Root = styled.div`
    flex: 1;
`;

const MessagesWrapper = styled.div`
    height: calc(
        100vh - ${({ inputToolbarHeight }) => inputToolbarHeight + 64}px
    );
`;

class Chat extends Component {
    static propTypes = {
        messages: PropTypes.array,
        partner: PropTypes.object,
        placeholder: PropTypes.string,
        showTypingIndicator: PropTypes.bool,
        textInputProps: PropTypes.object,
        user: PropTypes.object,
    };

    static defaultProps = {
        placeholder: 'Write something...',
        onSend: () => console.log,
    };

    state = {
        inputToolbarHeight: 0,
        isMounted: false,
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
        const { onSend } = this.props;
        const { isMounted } = this.state;
        if (!Array.isArray(messages)) {
            messages = [messages];
        }

        if (shouldResetInputToolbar === true) {
            this.setState({ typingDisabled: true });
            this.resetInputToolbar();
        }

        onSend(messages);
        this.messageContainerRef.scrollToTop();

        if (shouldResetInputToolbar === true) {
            setTimeout(() => {
                if (isMounted === true) {
                    this.setState({ typingDisabled: false });
                }
            }, 100);
        }
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

        return (
            <InputToolbar onResize={this.setInputToolbarHeight} {...props} />
        );
    };

    resetInputToolbar = () => {
        if (this.textInput) {
            this.textInput.value = '';
        }
        this.setState({
            text: '',
        });
    };

    scrollTo = (index, animated = true) => {
        if (this.messageContainerRef !== null) {
            this.messageContainerRef.scrollToIndex(index, animated);
        }
    };

    setInputToolbarHeight = ({ height }) =>
        this.setState({
            inputToolbarHeight: height,
        });

    setMessageContainerRef = el => {
        this.messageContainerRef = el;
    };

    get messages() {
        const { messages, showTypingIndicator, partner } = this.props;
        console.log(messages);
        if (showTypingIndicator) {
            return [
                {
                    id: uuid(),
                    created_at: new Date(),
                    system: true,
                    color: 'alt_text',
                    text: `${partner.name} is typing...`,
                },
                ...messages,
            ];
        }
        return messages;
    }

    render() {
        const { partner, user } = this.props;
        const { inputToolbarHeight } = this.state;
        return (
            <Root>
                <ChatHeader {...{ partner }} />
                <MessagesWrapper {...{ inputToolbarHeight }}>
                    <MessagesList
                        {...{ inputToolbarHeight, user, partner }}
                        data={this.messages}
                        setMessageContainerRef={this.setMessageContainerRef}
                    />
                </MessagesWrapper>
                {this.renderInputToolbar()}
            </Root>
        );
    }
}

export default Chat;
