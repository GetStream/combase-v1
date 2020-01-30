import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Components //
import Avatar from 'shared/Avatar';
import {
    ArrowBackIcon,
    CloseChatIcon,
    InfoIcon,
    TransferIcon,
} from 'shared/Icons';
import ActionsGroup from 'shared/ActionsGroup';
import IconButton from 'shared/IconButton';
import Text from 'shared/Text';

const Root = styled.div`
    flex: 0 0 64px;
    padding: 0px 16px;
    flex-direction: row;
    align-items: center;
    background-color: ${({ theme }) => theme.color.surface};
    border-bottom: 1px solid ${({ theme }) => theme.color.border};
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
    margin-left: 8px;
    flex-direction: row;
    @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
        margin-left: 16px;
    }
`;

const Content = styled.div`
    margin-left: 12px;
`;

const BackLink = styled(Link)`
    @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
        display: none;
    }
`;

const Actions = styled(ActionsGroup)`
    display: none;

    @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
        display: flex;
    }
`;

const ChatHeader = ({ partner }) => {
    return (
        <Root>
            <Main>
                <BackLink to="/inbox">
                    <IconButton
                    icon={ArrowBackIcon}
                    color="text"
                />
                </BackLink>
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
