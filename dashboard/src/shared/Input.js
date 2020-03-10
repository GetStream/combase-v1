import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { animated, interpolate } from 'react-spring';
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

const LabelWrapper = styled.div`
    position: absolute;
    top: -8px;
    left: 16px;
`;

const Label = styled(Text)`
    transform-origin: top left;
    pointer-events: none;
    user-select: none;
`;

const LabelBg = styled(animated.div)`
    position: absolute;
    top: -4px;
    bottom: -4px;
    left: -4px;
    right: -4px;
    background-color: ${({ theme }) => theme.color.surface};
    transform-origin: center;
`;

const Input = ({ focused, hasValue, inputProps, labelAnim, label }) => {
    const [labelDims, setLabelDims] = useState();
    const labelRef = useCallback((el) => {
        if (el && !labelDims) {
            const dims = el.getBoundingClientRect();
            setLabelDims(dims);
        }
    }, [labelDims]);

    const labelStyle = useMemo(() => ({
        transform: interpolate([
            labelAnim.translate.interpolate({
                range: [0, 1],
                output: [32, 0],
            }),
            labelAnim.scale.interpolate({
                range: [0, 1],
                output: [1.3333333333, 1],
            })
        ], (translate, scale) => `translate3d(0, ${translate}px, 0) scale(${scale})`),
    }), [labelAnim.translate, labelAnim.scale]);

    const labelBgStyle = useMemo(() => ({
        transform: labelAnim.scale.interpolate({
            range: [0, 1],
            output: [0, 1],
        }).interpolate(v => `scaleX(${v})`),
    }), [labelAnim.scale]);

    return (
        <Root {...{ focused, hasValue }}>
            <Field {...inputProps} />
            {label ? (
                <LabelWrapper>
                    <LabelBg style={labelBgStyle} width={labelDims ? labelDims.width + 4 : 0} />
                    <Label ref={labelRef} color={focused || hasValue ? "primary" : "alt_text"} as={animated.p} weight="500" size={12} style={labelStyle} faded={!hasValue && !focused}>
                        {label}
                    </Label>
                </LabelWrapper>
            ) : null}
        </Root>
    );
}

export default asInput(Input);