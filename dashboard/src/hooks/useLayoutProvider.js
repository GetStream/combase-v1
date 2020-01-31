import { useEffect, useState } from 'react';

export default (LayoutUtil, itemHeight) => {
    const [{ width }, onResize] = useState({ width: 0 });
    const [layoutProvider, setLayoutProvider] = useState(
        LayoutUtil.getLayoutProvider(width, itemHeight)
    );
    useEffect(() => {
        setLayoutProvider(LayoutUtil.getLayoutProvider(width, itemHeight));
    }, [width]);
    return [layoutProvider, onResize];
};
