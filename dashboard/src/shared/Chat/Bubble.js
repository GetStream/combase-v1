import React, { Component } from 'react';
import styled from 'styled-components';

// Hooks //
import useMedia from 'hooks/useMedia';

// Components //
import Text from 'shared/Text';

const Root = styled.div`
    flex: 1;
    align-items: ${({ pos }) => (pos === 'left' ? 'flex-start' : 'flex-end')};
`;

const Bubble = styled.div`
    border-top-left-radius: ${({ hasPrev, pos, theme }) =>
        hasPrev && pos === 'left' ? theme.borderRadius / 2 : theme.borderRadius}px;
    border-top-right-radius: ${({ hasPrev, pos, theme }) =>
        hasPrev && pos !== 'left' ? theme.borderRadius / 2 : theme.borderRadius}px;
    border-bottom-left-radius: ${({ hasNext, pos, theme }) =>
        hasNext && pos === 'left' ? theme.borderRadius / 2 : theme.borderRadius}px;
    border-bottom-right-radius: ${({ hasNext, pos, theme }) =>
        hasNext && pos !== 'left' ? theme.borderRadius / 2 : theme.borderRadius}px;
    padding: 12px;
    background-color: ${({ pos, theme }) =>
        pos === 'left' ? theme.colorUtils.fade(theme.color.text, 0.04) : theme.color.primary};
    margin-right: ${({ isMobile, pos, theme }) => (pos === 'left' ? isMobile ? 64 : 160 : 0)}px;
    margin-left: ${({ hasAvatar, isMobile, pos, theme }) =>
        pos === 'left' ? (hasAvatar ? 0 : 40) : isMobile ? 64 : 160}px;
`;

const renderText = (currentMessage, position) => {
    if (currentMessage && currentMessage.text) {
        const color = position === 'left' ? 'text' : 'surface';
        return (
            <Text weight='400' size={14} lineHeight={20} color={color}>
                {currentMessage.text}
            </Text>
        );
    }
    return null;
};

const MessageBubble = ({ currentMessage, hasAvatar, hasNext, hasPrev, position }) => {
    const isMobile = useMedia('sm');
    return (
        <Root pos={position}>
            <Bubble {...{ hasAvatar, hasNext, hasPrev, isMobile }} pos={position}>
                {renderText(currentMessage, position)}
            </Bubble>
        </Root>
    );
};

export default MessageBubble;
