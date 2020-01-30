import React from 'react';
import styled from 'styled-components';

// Utils //
import history from 'utils/history';

// Components //
import Avatar from 'shared/Avatar';
import {
    ArrowBackIcon,
    CloseChatIcon,
    InfoIcon,
    TransferIcon,
} from 'shared/Icons';
import IconButton from 'shared/IconButton';
import Text from 'shared/Text';

const Root = styled.div`
    flex: 0 0 64px;
    padding: 0px 16px;
    flex-direction: row;
    align-items: center;
    background-color: ${({ theme }) => theme.color.surface};
    @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
        padding: 0px 24px;
        justify-content: space-between;
    }
`;

const Main = styled.div`
    flex-direction: row;
    align-items: center;
`;

const UserWrapper = styled.div`
    margin-left: 16px;
    flex-direction: row;
`;

const Content = styled.div`
    margin-left: 12px;
`;

const Actions = styled.div`
    display: none;
    flex-direction: row;
    align-items: center;

    @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
        display: flex;
    }

    & > * + * {
        margin-left: 16px;
    }
`;

const ChatHeader = ({ partner }) => {
    return (
        <Root>
            <Main>
                <IconButton
                    icon={ArrowBackIcon}
                    color="text"
                    onClick={history.goBack}
                />
                <UserWrapper>
                    <Avatar
                        src={partner.avatar}
                        name={partner.name}
                        size={32}
                    />
                    <Content>
                        <Text weight="500">{partner.name}</Text>
                        <Text size={12} faded>
                            Active now
                        </Text>
                    </Content>
                </UserWrapper>
            </Main>
            <Actions>
                <IconButton color="alt_text" icon={CloseChatIcon} />
                <IconButton color="alt_text" icon={TransferIcon} />
                <IconButton color="alt_text" icon={InfoIcon} />
            </Actions>
        </Root>
    );
};

export default ChatHeader;
