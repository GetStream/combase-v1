import User from 'models/user';
import Chat from 'models/chat';
import { AddToWebhookUserQueue } from 'workers/webhook-user/queue';
import { AddToWebhookChatQueue } from 'workers/webhook-chat/queue';

exports.destroy = async (req, res) => {
	try {
		const data = { ...req.body, ...req.params };
		const { serialized } = req;

		if (serialized.role !== 'admin') {
			return res.status(403).json({
				status: 'Invalid permissions to view or modify this resource.',
			});
		}

		const user = await User.findByIdAndRemove(data.user);
		await AddToWebhookUserQueue('removed', user);

		const chat = await Chat.remove({
			'refs.organization': data.organization,
		});
		await AddToWebhookChatQueue('removed', chat);

		res.sendStatus(204);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
