import React from 'react';
import styled from 'styled-components';

// Utils //
import history from 'utils/history';

// Components //
import Avatar from 'shared/Avatar';
import { ArrowBackIcon } from 'shared/Icons';
import IconButton from 'shared/IconButton';
import Text from 'shared/Text';

const Root = styled.div`
    flex: 0 0 64px;
    flex-direction: row;
    align-items: center;
    padding: 0px 16px;
    background-color: ${({ theme }) => theme.color.surface };
`;

const UserWrapper = styled.div`
    margin-left: 8px;
    flex-direction: row;
`;

const Content = styled.div`
    margin-left: 12px;
`;

const ChatHeader = ({ partner }) => {
    return (
        <Root>
            <IconButton icon={ArrowBackIcon} color="text" onClick={history.goBack} />
            <UserWrapper>
                <Avatar src={partner.avatar} name={partner.name} size={32} />
                <Content>
                    <Text weight="500">{partner.name}</Text>
                    <Text size={12} faded>Active now</Text>
                </Content>
            </UserWrapper>
        </Root>
    );
};

export default ChatHeader;