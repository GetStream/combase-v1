import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Text } from '@comba.se/ui';

// Components //
const Root = styled.div`
    height: 32px;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-bottom: 16px;
`;

export default ({ date }) => (
    <Root>
        <Text faded size={12}>
            {moment(date).calendar()}
        </Text>
    </Root>
);
