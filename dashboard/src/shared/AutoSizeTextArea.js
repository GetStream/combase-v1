import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import Autogrow from 'textarea-autogrow';

// Components //
const Root = styled.textarea`
    overflow-y: hidden;
    resize: none;
    border-box: content-box;
    line-height: 24px;
    min-height: 24px;
`

const AutoSizeTextArea = props => {
    const [inputRef, setInputRef] = useState(null);
    // const onInput = useCallback((e) => {
    //     if (inputRef) {
    //         console.log(inputRef.offsetHeight);
    //         const offset = e.target.offsetHeight - e.target.clientHeight;
    //         e.target.style.height = `${e.target.scrollHeight + offset}px`;
    //     }
    // }, [inputRef]);
    useEffect(() => {
        if (inputRef) {
            new Autogrow(inputRef)
        }
    }, [inputRef]);
    const ref = useCallback((el) => {
        if (el && !inputRef) {
            setInputRef(el);
        }
    }, [inputRef]);
    return <Root {...{ ref }} {...props} rows="1" />
};

export default AutoSizeTextArea;