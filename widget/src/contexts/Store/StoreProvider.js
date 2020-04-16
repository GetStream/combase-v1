import React, { useCallback, useMemo, useReducer } from 'react';
import Context from './index';
import reducer from './reducer';

const initialState = {
	isOpen: false,
};

export default ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const toggleWidget = useCallback(() => {
		dispatch({
			type: 'toggleWidget',
		});
	}, []);

	const value = useMemo(() => [state, { dispatch, toggleWidget }], [dispatch, state, toggleWidget]);

	return (
		<Context.Provider value={value}>
			{children}
		</Context.Provider>
	);
}