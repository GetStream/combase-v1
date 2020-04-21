import { useCallback, useEffect, useMemo, useReducer } from 'react';
import delay from '@comba.se/ui/utils/delay';

// Contexts //
import { useAuth } from 'contexts/Auth';

import reducer from './reducer';

const initialState = {
	email: '',
	initialMessage: '',
	name: '',
	step: 0,
	messages: [],
};

export default (onComplete) => {
	const [{ step, messages, ...values }, dispatch] = useReducer(reducer, initialState);
	const { organization, user } = useAuth();

	const handleSend = useCallback(async ({ text }) => {
		switch (step) {
			case 0:
				dispatch({
					type: 'Onboard/InitialMessage',
					text,
					user: {
						id: user._id,
					},
				});
				await delay(2000);
				return dispatch({
					type: 'Onboard/Send',
					user: {
						name: organization.name,
						avatar: organization.meta.branding.logo,
					},
					text: "Before we hand you to an agent, What is your name?",
					step: 1,
				})
			case 1:
				dispatch({
					type: 'Onboard/Name',
					text,
					user: {
						id: user._id,
					},
				});
				await delay(2000);
				dispatch({
					type: 'Onboard/Send',
					user: {
						name: organization.name,
						avatar: organization.meta.branding.logo,
					},
					text: `Thanks, ${text}!`,
				})
				await delay(1000);
				return dispatch({
					type: 'Onboard/Send',
					user: {
						name: organization.name,
						avatar: organization.meta.branding.logo,
					},
					text: `Finally, what's your email?`,
					step: 2,
				})
			case 2:
				dispatch({
					type: 'Onboard/Email',
					text,
					user: {
						id: user._id,
					},
				});
				await delay(2000);
				dispatch({
					type: 'Onboard/Send',
					user: {
						name: organization.name,
						avatar: organization.meta.branding.logo,
					},
					text: "Thanks! We're putting you through to an agent now 😄",
				});

				if (onComplete) {
					// We hve to explicitly pass the email here ad merge with the state values
					// the useCallback won't re-render with the email value before this function
					// is run - There's probably a nicer way around this.
					await onComplete({ ...values, email: text });
				}

				return null;
			default:
				return null;
		}
	}, [step, user, organization, onComplete, values]);

	useEffect(() => {
		if (user._id === '!anon' && !organization.welcome.enabled) {
			dispatch({
				type: 'Onboard/Send',
				user: {
					id: organization._id,
					name: organization.name,
					avatar: organization.meta.branding.logo
				},
				text: organization.welcome.message
			})
		}
	}, [])


	return [messages, handleSend];
}