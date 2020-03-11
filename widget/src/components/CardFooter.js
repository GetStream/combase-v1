import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Button } from "@comba.se/ui";

// Components //
const Root = styled.div`
    padding: 16px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const CardFooter = () => {
    const history = useHistory();
    return (
        <Root>
            <div />
            <Button onClick={() => history.push('/5e5f54c4c5a922f38b59aa19')} flat label="New Conversation" />
        </Root>
    );
};

export default CardFooter;