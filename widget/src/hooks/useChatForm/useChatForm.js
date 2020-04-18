import { useCallback, useMemo, useReducer } from 'react';

// Contexts //
import { useAuth } from 'contexts/Auth';

import reducer from './reducer';

const initialState = {
	email: '',
	initialMessage: '',
	name: '',
	step: 0,
};

export default () => {
	const [{ step, ...values }, dispatch] = useReducer(reducer, initialState);
	const { organization, user } = useAuth();

	const handleSend = useCallback(({ text }) => {
		switch (step) {
			case 0:
				console.log('initialMessage', text);
			case 1:
				console.log('name', text);
				break;
			case 2:
				console.log('email', text);
				break;
			default:
				console.log(step, text);
				break;
		}
	}, [step]);

	const messages = useMemo(() => {
		if (user._id === '!anon') {
			return !organization.welcome.enabled ? [{
				id: 0,
				created_at: new Date(),
				user: {
					name: organization.name,
					avatar: organization.meta.branding.logo,
				},
				text: organization.welcome.message
			}] : [];
		}
		return undefined;
	}, [organization, user._id]);

	if (!messages) {
		return [undefined, undefined];
	}


	return [messages, handleSend];
}