import React, { useCallback, useContext } from 'react';
import styled from 'styled-components';

// CSS //
import pageCard from 'styles/css/pageCard';

// Contexts //
import AuthContext from 'contexts/Auth';

// HOCs //
import withChat from 'shared/Chat/hocs/withChat';

// Components //
import Chat from 'shared/Chat';
import { ChatIcon } from 'shared/Icons';
import EmptyState from 'shared/EmptyState';

const Root = styled.div`
    flex: 1;
    z-index: 2;
    background-color: ${({ theme }) => theme.color.surface};

    @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
        ${pageCard}
    }
`;

const EmptyRoot = styled(Root)`
    justify-content: center;
    align-items: center;
`;

const dummyMessages = [
    { system: true, text: 'Start of your conversation with Luke S.' },
];

const MessageThread = ({ channel, match, messages, partner }) => {
    const user = useContext(AuthContext);

    const onSend = useCallback(
        newMessages => {
            // setMessages(append(messages, newMessages));
            channel.sendMessage(newMessages[0]);
        },
        [messages]
    );

    if (!match) {
        return (
            <EmptyRoot>
                <EmptyState icon={ChatIcon} text="Select a thread." />
            </EmptyRoot>
        );
    }

    return (
        <Root>
            <Chat {...{ onSend, messages, partner, user }} />
        </Root>
    );
};

export default withChat(MessageThread);
