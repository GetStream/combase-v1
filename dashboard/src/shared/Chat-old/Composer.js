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
    actionsOpen,
    actionsWidth,
    keyboardAppearance,
    multiline,
    onInputSizeChanged,
    onTextChanged,
    onSend,
    placeholder,
    placeholderTextColor,
    setActionsOpen,
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
        ({ target: { value } }) => {
            setActionsOpen(false);
            onTextChanged(value);
        },
        [onTextChanged, setActionsOpen]
    );

    const anim = useSpring({
        value: !text || actionsOpen ? 1 : 0,
        config: {
            tension: 200,
            friction: 19,
        },
    });

    const style = {
        paddingLeft: anim.value
            .interpolate({
                range: [0, 1],
                output: [actionsWidth / 2, actionsWidth + 32], // 24px margin on actions
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
                    placeholder,
                    placeholderTextColor,
                    onKeyDown,
                }}
                value={text}
                {...textInputProps}
            />
        </Root>
    );
};

export default Composer;
