import React, { useMemo } from 'react';
import styled from 'styled-components';
import { animated } from 'react-spring';
import { Text } from '@comba.se/ui';

// HOCs //
import asInput from 'hocs/asInput';

// Components //
const Root = styled.div`
    justify-content: center;
    align-items: center;
    flex-direction: row;
    border-radius: ${({ theme }) => theme.borderRadius}px;
    border: 2px solid ${({ focused, hasValue, theme }) => hasValue || focused ? theme.color.primary : theme.color.border};

    &:hover {
        border-color: ${({ focused, hasValue, theme }) => hasValue || focused ? theme.color.primary : theme.colorUtils.darken(theme.color.border, 0.1)};
    }
`;

const Field = styled.input`
    flex: 1;
    padding: 24px 16px;
    font-size: 16px;
    font-weight: 500;
`;

const Label = styled(Text)`
    position: absolute;
    top: 24px;
    left: 16px;
    transform: translate3d(0, -50%);
`

const Input = ({ focused, focusAnim, hasValue, inputProps, label }) => {
    const labelStyle = useMemo(() => {
        transform: focusAnim.value.interpolate({
            range: [0, 1],
            output: [50, 0],
        }).interpolate(v => `translate3d(0, ${v}%, 0)`)
    }, []);

    return (
        <Root {...{ focused, hasValue }}>
            <Field {...inputProps} />
            {label ? (
                <Label color="alt_text" as={animated.p} weight="500" size={16} style={labelStyle} faded>
                    {label}
                </Label>
            ) : null}
        </Root>
    );
}

export default asInput(Input);