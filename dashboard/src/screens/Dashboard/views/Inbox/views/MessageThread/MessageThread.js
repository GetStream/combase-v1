import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

// CSS //
import pageCard from 'styles/css/pageCard';

// Components //
import Chat, { append } from 'shared/Chat';
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

const user = { id: 'lukesmetham', name: 'Luke' };

const dummyMessages = [
    {
        user: { id: 'lukesmetham', name: 'Luke S.' },
        created_at: new Date(),
        text: 'Hi',
    },
    {
        user: { id: 'nickparsons', name: 'Nick P.' },
        created_at: new Date(),
        text: 'Hey',
    },
    { system: true, text: 'Start of your conversation with Luke S.' },
];

export default ({ match }) => {
    const [messages, setMessages] = useState(dummyMessages);

    const onSend = useCallback(
        newMessages => {
            console.log(messages, newMessages);
            setMessages(append(messages, newMessages));
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
            <Chat {...{ messages, onSend, user }} />
        </Root>
    );
};
