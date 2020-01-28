import User from 'models/user';
import { AddToWebhookUserQueue } from 'workers/webhook-user/queue';

exports.update = async (req, res) => {
	try {
		const data = req.body;
		const params = req.params;

		const user = await User.updateOne(
			{ _id: params.user },
			{ $set: data }
		).lean();

		await AddToWebhookUserQueue('updated', user);

		res.status(200).json(user);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
