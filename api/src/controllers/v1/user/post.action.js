import User from 'models/user';
import { AddToWebhookUserQueue } from 'workers/webhook-user/queue';

exports.post = async (req, res) => {
	try {
		const data = { ...req.body, ...req.params };

		const user = await User.create(data);

		await AddToWebhookUserQueue('created', user);

		res.status(200).json(user);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
