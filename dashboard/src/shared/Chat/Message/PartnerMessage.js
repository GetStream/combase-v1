import React, { memo } from 'react';
import styled from 'styled-components';

// HOCs //
import asMessage from '../hocs/asMessage';

// Components //
import Avatar from 'shared/Avatar';
import Text from 'shared/Text';

const Root = styled.div`
    flex-direction: row;
    z-index: 0;
`;

const AvatarWrapper = styled.div`
    justify-content: flex-end;
    align-items: flex-end;
`;

const AvatarBubble = styled.div`
    width: ${({ size }) => size + 10}px;
    height: ${({ size }) => size + 10}px;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    bottom: -4px;
    right: -4px;
    background-color: ${({ theme }) => theme.color.surface};
    z-index: 2;
`;

const Bubble = styled.div`
    padding: 20px;
    ${'' /* padding-left: ${({ showAvatar }) => (showAvatar ? 24 : 20)}px; */}
    background-color: ${({ theme }) => theme.color.primary};
    border: 1px solid ${({ theme }) => theme.color.primary};
    border-top-left-radius: ${({ hasPrev, theme }) =>
        hasPrev ? theme.borderRadius : theme.borderRadius * 2}px;
    border-top-right-radius: ${({ theme }) => theme.borderRadius * 2}px;
    border-bottom-left-radius: ${({ showAvatar, hasNext, theme }) =>
        showAvatar
            ? 0
            : hasNext
            ? theme.borderRadius
            : theme.borderRadius * 2}px;
    border-bottom-right-radius: ${({ theme }) => theme.borderRadius * 2}px;
    margin-right: 64px;
    margin-left: ${({ showAvatar }) => (showAvatar ? 0 : 56)}px;
    @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
        margin-right: 160px;
    }

    ${({ showAvatar, theme }) =>
        showAvatar
            ? `

        &::before {
            position: absolute;
            bottom: -1px;
            left: -20px;
            z-index: 0;
            content: '';
            width: 0;
            height: 0;
            border-top: 32px solid transparent;
            border-bottom: 0px solid transparent;
            border-right: 20px solid ${theme.color.primary};
        }

    `
            : null}
`;

const PartnerMessage = memo(
    ({ currentMessage: { text, user }, hasNext, hasPrev }) => {
        const showAvatar = (hasPrev && !hasNext) || (!hasPrev && !hasNext);
        return (
            <Root>
                {showAvatar ? (
                    <AvatarWrapper>
                        <AvatarBubble size={48}>
                            <Avatar
                                showStatus={false}
                                name={user.name}
                                src={user.avatar}
                                size={48}
                            />
                        </AvatarBubble>
                    </AvatarWrapper>
                ) : null}
                <Bubble {...{ hasNext, hasPrev, showAvatar }}>
                    <Text color="white">{text}</Text>
                </Bubble>
            </Root>
        );
    }
);

export default asMessage(PartnerMessage);
