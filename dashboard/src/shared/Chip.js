import React, { memo } from 'react';
import styled from 'styled-components';

// Components //
import Text from 'shared/Text';

const Root = styled.div`
    padding: 4px 8px;
    border-radius: 9999px;
    background-color: ${({ color, theme }) => theme.color[color]};

    & > ${Text} {
        user-select: none;
    }
`;

const Chip = memo(({ color, label, onClick, textColor }) => {
    return (
        <Root {...{ color, onClick }}>
            <Text color={textColor}>{label}</Text>
        </Root>
    );
});

Chip.defaultProps = {
    color: 'primary',
    textColor: 'surface',
};

export default Chip;
