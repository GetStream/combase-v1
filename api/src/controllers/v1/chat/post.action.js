import cld from 'cld';

import Chat from 'models/chat';
import { AddToWebhookChatQueue } from 'workers/webhook-chat/queue';

exports.post = async (req, res) => {
	try {
		const { user, agent, chat, organization } = req.body;

		cld.detect(chat.excerpt, (error, language) => {
			if (error) {
				console.error(error);
			}

			console.log(language);
			
			const create = await Chat.create({
				chat: {
					...chat,
					language
				},
				refs: {
					user,
					agent,
					organization,
				},
			});
	
			await AddToWebhookChatQueue('added', chat);
	
			res.status(200).json(create);
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
