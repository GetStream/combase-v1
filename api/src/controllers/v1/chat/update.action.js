import Chat from 'models/chat';
import { AddToWebhookChatQueue } from 'workers/webhook-chat/queue';

exports.update = async (req, res) => {
	try {
		const data = req.body;
		const params = req.params;

		const chat = await Chat.updateOne({ _id: params.chat }, { $set: data });

		await AddToWebhookChatQueue('updated', chat);

		res.status(200).json(chat);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
