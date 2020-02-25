import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';

// Hooks //
import usePrevious from 'hooks/usePrevious';

// Components //
import Text from 'shared/Text';

const Root = styled.div`
    flex-direction: row;
    height: 48px;
    border-radius: ${({ theme }) => theme.borderRadius}px;
    background-color: ${({ theme }) => theme.color.surface};
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.12);
    overflow: hidden;
    z-index: 1;

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
    left: ${({ hasIcon }) => hasIcon ? 56 : 12}px;
    transform: translateY(-50%);
    pointer-events: none;
    user-select: none;
`;

const ErrorRow = styled.div`
    z-index: 0;
    padding: 0px 8px;
    height: 12px;
    & ${Text} {
        padding: 4px 0px;
    }
`

const Input = ({
    error,
    icon: Icon,
    name,
    onBlur,
    onChange,
    onFocus,
    placeholder,
    touched,
    type,
    value,
    ...rest
}) => {
    const prevError = usePrevious(error);
    const [focused, setFocus] = useState(false);
    const anim = useSpring({ value: !!value || focused ? 1 : 0, config: { tension: 200, friction: 15 } });
    const errorAnim = useSpring({ value: !!error && touched && !focused ? 1 : 0, config: { tension: 200, friction: 15 } });
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

    const errorStyle = useMemo(() => ({
        transform: errorAnim.value.interpolate({
            range: [0, 1],
            output: ['-100%', '0%'],
        }).interpolate(v => `translate3d(0, ${v}, 0)`)
    }), [errorAnim]);

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
                    <Placeholder hasIcon={!!Icon}>
                        <Text as={animated.p} faded color="alt_text" weight="500" size={14} style={placeholderStyle}>
                            {placeholder}
                        </Text>
                    </Placeholder>
                ) : null}
            </Root>
            <ErrorRow>
                <Text as={animated.p} color="error" size={12} style={errorStyle}>{error || prevError}</Text>
            </ErrorRow>
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
