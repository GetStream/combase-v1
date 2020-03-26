export default (state, action) => {
	switch (action.type) {
		case 'activeChannel/clear':
			return { ...state, activeChannel: '' };
		case 'activeChannel/set':
			return { ...state, activeChannel: action.id };
		case 'toggleWidget':
			return { ...state, isOpen: !state.isOpen };
		default:
			return state;
	}
};