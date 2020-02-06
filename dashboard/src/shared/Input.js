import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Components //
const Root = styled.input``;

const Input = ({ onBlur, onChange, onFocus }) => {
    const [focused, setFocus] = useState(false);

    const handleChange = useCallback(({ target: { value } }) => {
        onChange(value);
    }, []);

    const handleFocus = useCallback(() => {
        setFocus(true);
        if (onFocus) {
            onFocus();
        }
    }, [onFocus, setFocus]);

    const handleBlur = useCallback(() => {
        setFocus(false);
        if (onBlur) {
            onBlur();
        }
    }, [onBlur, setFocus]);

    return (
        <Root
            {...{ focused }}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
        />
    );
};

Input.propTypes = {
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
};

export default Input;
