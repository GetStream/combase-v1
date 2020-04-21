import shortid from 'shortid';

export const generateMessage = (text, user) => ({
	created_at: new Date(),
	text,
	user,
	id: shortid.generate(),
})

export const sendMessage = (prevMessages, text, user) => {
	const messages = [generateMessage(text, user), ...prevMessages];
	return messages;
}