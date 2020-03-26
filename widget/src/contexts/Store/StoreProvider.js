import React, { useCallback, useMemo, useReducer } from 'react';
import Context from './index';
import reducer from './reducer';

const initialState = {
	activeChannel: '',
	isOpen: false,
};

export default ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const toggleWidget = useCallback(() => {
		dispatch({
			type: 'toggleWidget',
		});
	}, []);

	const value = useMemo(() => [state, { dispatch, toggleWidget }], [state, dispatch, toggleWidget]);

	return (
		<Context.Provider value={value}>
			{children}
		</Context.Provider>
	);
}