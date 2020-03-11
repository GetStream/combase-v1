import React from 'react';
import styled from 'styled-components';
import { Card, Input } from "@comba.se/ui";
import { KnowledgeBaseIcon } from "@comba.se/ui/Icons";

// Components //
import CardHeader from 'components/CardHeader';

const Root = styled(Card)`
    width: 100%;  
`;

const List = styled.div`
    padding: 16px 24px;
`

const KnowledgeBaseWidget = ({ className }) => {
    return (
        <Root {...{ className }}>
            <CardHeader icon={KnowledgeBaseIcon} title="Knowledge Base" />
            <List>
                <Input label="Search" />
            </List>
        </Root>
    );
};

export default KnowledgeBaseWidget;