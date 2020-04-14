import React, { useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import styled from 'styled-components';
import ListViewContext from './Context';
import { VariableSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

// Hooks //
import useLayout from 'hooks/useLayout';

// Components //
const Root = styled.div`
	height: 100%;
	width: 100%;
`;

const List = styled(VariableSizeList)`
	transform: scaleY(-1);
`;

const RowRoot = styled.div`
	transform: scaleY(-1);
	justify-content: center;
	align-items: center;

	&:nth-child(2n + 1) {
		background-color: #f9f9f9;
	}
`

const Row = ({ index, style }) => {
	const { reportSize, layout } = useContext(ListViewContext);
	const rootRef = useRef();
	React.useEffect(() => {
		console.log(rootRef.current.getBoundingClientRect());
		reportSize(index, rootRef.current.getBoundingClientRect().height);
	}, [layout]);
	return (
		<RowRoot ref={rootRef} style={style}>
			Row {index}
		</RowRoot>
	);
};

const autoSizerStyle = { height: '100%', width: '100%' };

const ListView = () => {
	const [layout, setRef] = useLayout();
	const listRef = useRef();
	const itemSizeMap = useRef({});
	const reportSize = useCallback((index, size) => {
		itemSizeMap.current = { ...itemSizeMap.current, [index]: size };
		listRef.current.resetAfterIndex(index);
	}, []);

	const value = useMemo(() => ({
		layout,
		reportSize,
	}), [layout, reportSize]);

	const getItemSize = useCallback(index => itemSizeMap.current[index] || 64, []);

	const renderList = useCallback(({ height, width }) => (
		<List ref={listRef} height={height} itemCount={100000} itemSize={getItemSize} width={width}>
			{Row}
		</List>
	), []);

	return (
		<ListViewContext.Provider value={value}>
			<Root>
				<AutoSizer style={autoSizerStyle}>
					{renderList}
				</AutoSizer>
			</Root>
		</ListViewContext.Provider>
	);
};

export default ListView;