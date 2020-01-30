import React from 'react';
import styled from 'styled-components';

// Components //
const Root = styled.div`
    transform: scaleY(-1);
`;

const UserMessage = props => {
    return <Root>User Message</Root>;
};

export default UserMessage;
