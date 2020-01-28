import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Components //
import InputToolbar from './InputToolbar';

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
    };

    state = {
        placeholder: 'Write something...',
        text: '',
    };

    renderMessagesList = () => {
        return <List />;
    };

    renderInputToolbar = () => {
        const { text } = this.state;
        const { placeholder, textInputProps } = this.props;

        const inputToolbarProps = {
            text,
            onSend: this.onSend,
            onTextChanged: this.onInputTextChanged,
            placeholder,
            textInputProps: {
                ...textInputProps,
                ref: input => (this.textInput = input),
            },
        };

        return <InputToolbar {...inputToolbarProps} />;
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
