import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import autosize from 'autosize';

// Components //

const Root = styled.textarea`
    overflow-y: hidden;
    resize: none;
    border-box: content-box;
    line-height: 24px;
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
    return <Root {...{ ref }} rows="3" {...props} />
};

export default AutoSizeTextArea;