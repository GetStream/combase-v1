import React, { useCallback } from 'react';
import styled from 'styled-components';

// Compmonents //
const Input = styled.textarea`
    flex: 1;
    resize: none;
    margin-right: 16px;
    font-size: 16px;
    line-height: 20px;
    outline: none;
    color: ${({ theme }) => theme.color.alt_text};
    font-weight: 500;

    &::-webkit-input-placeholder {
        color: ${({ theme }) => theme.colorUtils.fade(theme.color.alt_text, .56)};
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.sm }px) {
        margin-right: 0;
    }
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
