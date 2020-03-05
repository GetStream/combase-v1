import React from 'react';
import styled from 'styled-components';
import { Card } from "@comba.se/ui";
import { InboxIcon } from "@comba.se/ui/Icons";

// Components //
import CardHeader from 'components/CardHeader';

const Root = styled(Card)`
    width: 100%;  
`;

const List = styled.div`
    margin-top: 8px;
`

const ThreadsWidget = ({ className }) => {
    return (
        <Root {...{ className }}>
            <CardHeader icon={InboxIcon} title="Conversations" />
            <List>

            </List>
        </Root>
    );
};

export default ThreadsWidget;