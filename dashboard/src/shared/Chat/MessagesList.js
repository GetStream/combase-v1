import React, { useState } from 'react';

import LayoutUtil from './LayoutUtil';

// HOoks //
import useLayoutProvider from 'hooks/useLayoutProvider';

// Components //
import ListView from 'components/ListView';

const renderRow = () => {};

const MessagesList = ({ data, setMessageContainerRef }) => {
    const [layoutProvider, onResize] = useLayoutProvider(LayoutUtil);
    return (
        <ListView
            ref={setMessageContainerRef}
            {...{ data, layoutProvider, renderRow, onResize }}
            rowCount={10}
        />
    );
};

export default MessagesList;
