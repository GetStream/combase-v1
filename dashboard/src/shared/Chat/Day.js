import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

// Components //
import Text from 'shared/Text';

const Root = styled.div`
    height: 24px;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

export default ({ date }) => (
    <Root>
        <Text faded size={12}>
            {moment(date).calendar()}
        </Text>
    </Root>
);
