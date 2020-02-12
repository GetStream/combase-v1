import React from 'react';
import styled from 'styled-components';

// Components //
import Avatar from 'shared/Avatar';
import Text from 'shared/Text';

const Root = styled.div``;

const Header = styled.div`
    padding: 64px 16px;
    justify-content: center;
    align-items: center;

    & > ${Text}:first-of-type {
        margin-top: 16px;
    }

    & ${Text} + ${Text} {
        margin-top: 4px;
    }
`;

export default () => {
    return (
        <Root>
            <Header>
                <Avatar size={136} name="Luke" />
                <Text size={24} weight="600">
                    Luke Smetham
                </Text>
                <Text size={12} faded weight="400">
                    Active Now
                </Text>
            </Header>
        </Root>
    );
};
