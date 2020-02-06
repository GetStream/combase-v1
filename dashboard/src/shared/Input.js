import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Components //
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

const Input = ({
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
    const [focused, setFocus] = useState(false);
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

    return (
        <Root {...rest}>
            {Icon ? (
                <IconWrapper>
                    <Icon color="alt_text" />
                </IconWrapper>
            ) : null}
            <input
                {...{ focused, placeholder, name, type, value }}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
            />
        </Root>
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
