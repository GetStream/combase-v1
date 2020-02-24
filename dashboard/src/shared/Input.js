import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';

// Components //
import Text from 'shared/Text';

const Root = styled.div`
    flex-direction: row;
    height: 48px;
    border-radius: ${({ theme }) => theme.borderRadius}px;
    background-color: ${({ theme }) => theme.color.surface};
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.12);
    overflow: hidden;

    & > input {
        color: ${({ theme }) => theme.color.alt_text};
        font-size: 14px;
        padding: 12px;
        flex: 1;

        &:-webkit-autofill,
        &:-webkit-autofill:hover,
        &:-webkit-autofill:focus,
        &:-webkit-autofill:active {
            -webkit-text-fill-color: ${({ theme }) =>
        theme.color.alt_text} !important;
            -webkit-box-shadow: 0 0 0 30px ${({ theme }) => theme.color.surface}
                inset !important;
        }
    }
`;

const IconWrapper = styled.div`
    padding: 4px;
    padding-left: 16px;
    justify-content: center;
    align-items: center;
`;

const Label = styled.div`
    padding: 0px 8px;
    overflow: hidden;
    user-select: none;
    & ${Text} {
        padding: 4px 0px;
    }
`;

const Placeholder = styled.div`
    position: absolute;
    top: 50%;
    left: 12px;
    transform: translateY(-50%);
    pointer-events: none;
    user-select: none;
`;

const ErrorRow = styled.div`
    height: 12px;
`

const Input = ({
    error,
    icon: Icon,
    name,
    onBlur,
    onChange,
    onFocus,
    placeholder,
    type,
    value,
    ...rest
}) => {
    console.log(rest);
    const [focused, setFocus] = useState(false);
    const anim = useSpring({ value: focused || !!value ? 1 : 0, config: { tension: 200, friction: 15 } });
    const handleChange = useCallback(
        e => {
            if (onChange) {
                onChange(e);
            }
        },
        [onChange]
    );

    const handleFocus = useCallback(
        e => {
            setFocus(true);
            if (onFocus) {
                onFocus(e);
            }
        },
        [onFocus, setFocus]
    );

    const handleBlur = useCallback(
        e => {
            setFocus(false);
            if (onBlur) {
                onBlur(e);
            }
        },
        [onBlur, setFocus]
    );

    const labelStyle = useMemo(() => ({
        transform: anim.value.interpolate({
            range: [0, 1],
            output: ['100%', '0%'],
        }).interpolate(v => `translate3d(0, ${v}, 0)`)
    }), [anim]);

    const placeholderStyle = useMemo(() => ({
        opacity: anim.value.interpolate({
            range: [0, 1],
            output: [1, 0],
        }),
        transform: anim.value.interpolate({
            range: [0, 1],
            output: ["-0%", '-50%']
        }).interpolate(v => `translate3d(0, ${v}, 0)`)
    }), [anim]);

    return (
        <div>
            <Label>
                <Text color="primary" as={animated.p} size={12} weight="500" style={labelStyle}>{placeholder}</Text>
            </Label>
            <Root {...rest}>
                {Icon ? (
                    <IconWrapper>
                        <Icon color="alt_text" />
                    </IconWrapper>
                ) : null}
                <input
                    {...{ focused, name, type, value }}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                />
                {placeholder ? (
                    <Placeholder>
                        <Text as={animated.p} faded color="alt_text" weight="500" size={14} style={placeholderStyle}>
                            {placeholder}
                        </Text>
                    </Placeholder>
                ) : null}
                <ErrorRow>
                    {error}
                </ErrorRow>
            </Root>
        </div>
    );
};

Input.propTypes = {
    icon: PropTypes.any,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    placeholder: PropTypes.string,
    type: PropTypes.string,
};

export default Input;
