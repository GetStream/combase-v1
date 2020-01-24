import React, { memo, useCallback } from 'react';
import styled from 'styled-components';

// Components //
import Text from 'shared/Text';

const Root = styled.div`
    padding: 4px 8px;
    border-radius: 9999px;
    background-color: ${({ active, theme }) =>
        active ? theme.color.primary : 'transparent'};
    cursor: pointer;
    transition: 0.24s background-color
        ${({ theme }) => theme.easing.css(theme.easing.standard)};

    & > ${Text} {
        user-select: none;
    }

    &:hover {
        background-color: ${({ active, theme }) =>
            !active ? theme.colorUtils.fade(theme.color.gray, 0.24) : null};
    }

    &:active {
        background-color: ${({ active, theme }) =>
            !active ? theme.colorUtils.fade(theme.color.gray, 0.48) : null};
    }
`;

export default memo(({ active, label, onClick }) => {
    const handleClick = useCallback(() => {
        return onClick ? onClick(label) : null;
    }, [label, onClick]);

    return (
        <Root {...{ active }} onClick={handleClick}>
            <Text color={active ? 'surface' : 'gray'}>{label}</Text>
        </Root>
    );
});
