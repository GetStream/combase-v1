import React, { useCallback } from 'react';
import styled from 'styled-components';

// Compmonents //
const Input = styled.textarea`
    flex: 1;
    resize: none;
    font-size: 16px;
    line-height: 20px;
    outline: none;
    height: ${({ height }) => height}px;
`;

const Composer = ({
    keyboardAppearance,
    multiline,
    onInputSizeChanged,
    onTextChanged,
    onSend,
    placeholder,
    placeholderTextColor,
    textInputProps,
    text: value,
}) => {
    const onKeyDown = useCallback(
        e => {
            if (e.keyCode === 13 && !e.shiftKey) {
                if (!value) {
                    return e.preventDefault();
                }
                onSend({ text: value.trim() }, true);
            }
            return false;
        },
        [value, onSend]
    );

    const handleChange = useCallback(
        ({ target: { value } }) => onTextChanged(value),
        [value]
    );

    return (
        <Input
            accessible
            accessibilityLabel={placeholder}
            enablesReturnKeyAutomatically
            onChange={handleChange}
            testID={placeholder}
            underlineTextColorAndroid="transparent"
            {...{
                keyboardAppearance,
                multiline,
                onKeyDown,
                placeholder,
                placeholderTextColor,
                value,
            }}
            {...textInputProps}
        />
    );
};

export default Composer;
