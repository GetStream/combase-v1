import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import uuid from 'uuid/v4';
import Animated from 'animated/lib/targets/react-dom';

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
        textInputProps: PropTypes.object,
        user: PropTypes.object,
    };

    static defaultProps = {
        placeholder: 'Write something...',
        onSend: () => console.log,
    };

    state = {
        actionsWidth: 0,
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
        const { onSend, user } = this.props;
        const { isMounted } = this.state;
        if (!Array.isArray(messages)) {
            messages = [messages];
        }
        const newMessages = messages.map(message => {
            return {
                ...message,
                user,
                // user: this.props.partner,
                created_at: new Date(),
                id: uuid(),
            };
        });

        if (shouldResetInputToolbar === true) {
            this.setState({ typingDisabled: true });
            this.resetInputToolbar();
        }

        onSend(newMessages);
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
        const { actionsWidth, text } = this.state;
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
            <InputToolbar onResize={this.setInputToolbarHeight} setActionsWidth={this.setActionsWidth} {...{actionsWidth}} {...props} />
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

    setActionsOpen = actionsOpen =>
        this.setState({
            actionsOpen,
        });

    setActionsWidth = actionsWidth =>
        this.setState({
            actionsWidth,
        });

    setInputToolbarHeight = ({ height }) =>
        this.setState({
            inputToolbarHeight: height,
        });

    setMessageContainerRef = el => {
        this.messageContainerRef = el;
    };

    render() {
        const { messages, partner, user } = this.props;
        const { inputToolbarHeight } = this.state;
        return (
            <Root>
                <ChatHeader {...{ partner }} />
                <MessagesWrapper {...{ inputToolbarHeight }}>
                    <MessagesList
                        {...{ inputToolbarHeight, user, partner }}
                        data={messages}
                        setMessageContainerRef={this.setMessageContainerRef}
                    />
                </MessagesWrapper>
                {this.renderInputToolbar()}
            </Root>
        );
    }
}

export default Chat;
