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

	const clearActiveChannel = useCallback(() => {
		dispatch({
			type: 'activeChannel/clear',
		});
	}, []);

	const setActiveChannel = useCallback((id) => {
		dispatch({
			type: 'activeChannel/set',
			id,
		});
	}, []);

	const value = useMemo(() => [state, { clearActiveChannel, dispatch, setActiveChannel, toggleWidget }], [clearActiveChannel, dispatch, setActiveChannel, state, toggleWidget]);

	return (
		<Context.Provider value={value}>
			{children}
		</Context.Provider>
	);
}