import React from 'react';
import styled from 'styled-components';

// Components //
const Root = styled.div`
    transform: scaleY(-1);
`;

const PartnerMessage = props => {
    console.log(props);
    return <Root>Partner Message</Root>;
};

export default PartnerMessage;
