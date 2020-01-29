import React, { useState } from 'react';
import styled from 'styled-components';
import Animated from 'animated/lib/targets/react-dom';

import LayoutUtil from './LayoutUtil';

// HOoks //
import useLayoutProvider from 'hooks/useLayoutProvider';

// Components //
import ListView from 'components/ListView';

const renderRow = (data, index) => <div>Test</div>;
const style = { flex: 1 };

const MessagesList = ({ data, inputToolbarHeight, setMessageContainerRef }) => {
    const [layoutProvider, onResize] = useLayoutProvider(LayoutUtil);
    const [scrollAnim] = useState(new Animated.Value(0));
    return (
        <ListView
            {...{
                data,
                inputToolbarHeight,
                layoutProvider,
                renderRow,
                onResize,
                scrollAnim,
                setMessageContainerRef,
                style,
            }}
            rowCount={data.length}
        />
    );
};

export default MessagesList;
