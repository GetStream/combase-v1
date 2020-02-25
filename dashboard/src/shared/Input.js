import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';

// Styles //
import baseInputStyle from 'styles/css/baseInputStyle'

// Hooks //
import usePrevious from 'hooks/usePrevious';

// Components //
import AutoSizeTextArea from 'shared/AutoSizeTextArea';
import Card from 'shared/Card';
import Text from 'shared/Text';

const Root = styled(Card)`
    flex-direction: row;
    min-height: 48px;
    overflow: hidden;
    z-index: 1;

    & > input {
        flex: 1;
        ${baseInputStyle}
    }

    & > textarea {
        width: 100%;
        min-height: 50px;
        max-height: 288px;
        ${baseInputStyle}
    }
`;

const IconWrapper = styled.div`
    padding: 4px;
    padding-left: 16px;
    justify-content: center;
    align-items: center;
`;

const Label = styled.div`
    padding: 0px 12px;
    overflow: hidden;
    user-select: none;
    & ${Text} {
        padding: 4px 0px;
    }
`;

const Placeholder = styled.div`
    position: absolute;
    top: ${({ textarea }) => textarea ? "12px" : "50%"};
    left: ${({ hasIcon }) => hasIcon ? 56 : 12}px;
    transform: ${({ textarea }) => !textarea ? 'translateY(-50%)' : null};
    pointer-events: none;
    user-select: none;
`;

const ErrorRow = styled.div`
    z-index: 0;
    padding: 0px 12px;
    height: 16px;
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
    textarea,
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
                <Text color="primary" as={animated.p} size={12} line={12} weight="500" style={labelStyle}>{placeholder}</Text>
            </Label>
            <Root flat border {...rest}>
                {Icon ? (
                    <IconWrapper>
                        <Icon color="alt_text" />
                    </IconWrapper>
                ) : null}
                {!textarea ? (
                    <input
                        {...{ focused, name, type, value }}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onFocus={handleFocus}
                    />
                ) : (
                        <AutoSizeTextArea
                            {...{ focused, name, type, value }}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onFocus={handleFocus}
                        />
                    )}
                {placeholder ? (
                    <Placeholder {...{ textarea }} hasIcon={!!Icon}>
                        <Text as={animated.p} faded color="alt_text" weight="500" size={14} style={placeholderStyle}>
                            {placeholder}
                        </Text>
                    </Placeholder>
                ) : null}
            </Root>
            <ErrorRow>
                <Text as={animated.p} color="error" size={12} line={12} style={errorStyle}>{error || prevError}</Text>
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
