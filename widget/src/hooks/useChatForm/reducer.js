import { sendMessage } from './utils';

export default (state, action) => {
	switch (action.type) {
		case 'Onboard/Send':
			return { ...state, messages: sendMessage(state.messages, action.text, action.user), step: action.step || state.step };
		case 'Onboard/InitialMessage':
			return { ...state, initialMessage: action.text, messages: sendMessage(state.messages, action.text, action.user) };
		case 'Onboard/Name':
			return { ...state, name: action.text, messages: sendMessage(state.messages, action.text, action.user) };
		case 'Onboard/Email':
			return { ...state, email: action.text, messages: sendMessage(state.messages, action.text, action.user) };
		default:
			return state;
	}
}