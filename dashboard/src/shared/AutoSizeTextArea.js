import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import autosize from 'autosize';

// Components //

const Root = styled.textarea`
    overflow-y: hidden;
    resize: none;
    border-box: content-box;
    line-height: 24px;
    min-height: 50px;
    max-height: 288px;
`;

const AutoSizeTextArea = props => {
    const [inputRef, setInputRef] = useState(null);

    useEffect(() => {
        if (inputRef) {
            autosize(inputRef)
        }
    }, [inputRef]);
    const ref = useCallback((el) => {
        if (el && !inputRef) {
            setInputRef(el);
        }
    }, [inputRef]);
    return <Root {...{ ref }} {...props} rows="3" />
};

export default AutoSizeTextArea;