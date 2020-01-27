import React, { useCallback } from 'react';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';

// Compmonents //
const Root = styled(animated.div)`
    flex: 1;
`;

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
        color: ${({ theme }) =>
            theme.colorUtils.fade(theme.color.alt_text, 0.56)};
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
        margin-right: 0;
    }
`;

const Composer = ({
    actionsWidth,
    keyboardAppearance,
    multiline,
    onInputSizeChanged,
    onTextChanged,
    onSend,
    placeholder,
    placeholderTextColor,
    textInputProps,
    text,
}) => {
    const onKeyDown = useCallback(
        e => {
            if (e.keyCode === 13 && !e.shiftKey) {
                if (!text) {
                    return e.preventDefault();
                }
                onSend({ text: text.trim() }, true);
            }
            return false;
        },
        [text, onSend]
    );

    const handleChange = useCallback(
        ({ target: { value } }) => onTextChanged(value),
        [onTextChanged]
    );

    const anim = useSpring({
        value: !text ? 1 : 0,
        config: {
            tension: 140,
            friction: 16,
        },
    });

    const style = {
        paddingLeft: anim.value
            .interpolate({
                range: [0, 1],
                output: [0, actionsWidth],
            })
            .interpolate(value => `${value}px`),
    };

    return (
        <Root {...{ style }}>
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
                }}
                value={text}
                {...textInputProps}
            />
        </Root>
    );
};

export default Composer;
