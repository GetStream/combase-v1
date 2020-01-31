import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Styles //
import listItemInteractions from 'styles/css/listItemInteractions';

// Components //
import UserBlock from 'shared/UserBlock';
import Text from 'shared/Text';

const Root = styled.div`
    padding: 0px 16px;
    flex-direction: row;
    align-items: center;
    height: 80px;
    cursor: pointer;
    ${listItemInteractions}
    & ${Text} {
        user-select: none;
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
        padding: 0px 40px;
    }
`;

const Meta = styled.div`
    margin-left: 24px;
`;

const AgentItem = ({ _id, avatar, email, name }) => (
    <Link to={`/agents/${_id}`}>
        <Root>
            <UserBlock {...{ avatar, name }} meta={email} />
        </Root>
    </Link>
);

export default AgentItem;
