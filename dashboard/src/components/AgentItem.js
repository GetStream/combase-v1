import React from 'react';
import styled from 'styled-components';

// Styles //
import listItemInteractions from 'styles/css/listItemInteractions';

// Components //
import Avatar from 'shared/Avatar';
import Text from 'shared/Text';

const Root = styled.div`
    padding: 0px 40px;
    flex-direction: row;
    align-items: center;
    height: 80px;
    cursor: pointer;
    ${listItemInteractions}
    & ${Text} {
        user-select: none;
    }
`;

const Meta = styled.div`
    margin-left: 24px;
`;

const AgentItem = ({ avatar, email, name }) => (
    <Root>
        <Avatar size={48} name={name} src={avatar} />
        <Meta>
            <Text color="alt_text">{name}</Text>
            <Text color="alt_text" faded size={12}>
                {email}
            </Text>
        </Meta>
    </Root>
);

export default AgentItem;
