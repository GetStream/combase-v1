export default (state, action) => {
	switch (action.type) {
		case 'toggleWidget':
			return { ...state, isOpen: !state.isOpen };
		default:
			return state;
	}
};