import React, { memo } from 'react';
import styled from 'styled-components';

// Components //
import Text from 'shared/Text';

const Root = styled.div`
    padding: ${({ size }) => `${size / 4}px ${size / 2}px`};
    border-radius: 9999px;
    background-color: ${({ color, theme }) => theme.color[color]};

    & > ${Text} {
        user-select: none;
    }
`;

const Chip = memo(({ color, label, onClick, size, textColor }) => {
    return (
        <Root {...{ color, onClick, size }}>
            <Text color={textColor} {...{ size }}>
                {label}
            </Text>
        </Root>
    );
});

Chip.defaultProps = {
    color: 'primary',
    size: 16,
    textColor: 'surface',
};

export default Chip;
