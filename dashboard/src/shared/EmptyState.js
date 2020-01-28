import React, { memo } from 'react';
import styled from 'styled-components';

// Components //
import Text from 'shared/Text';

const Root = styled.div`
    justify-content: center;
    align-items: center;
    & > ${Text} {
        margin-top: 20px;
    }
`;

export default memo(({ icon: Icon, text = 'Nothing to show.' }) => (
    <Root>
        {Icon ? <Icon size={96} color="light_text" /> : null}
        <Text size={20} color="light_text" weight="500">
            {text}
        </Text>
    </Root>
));
