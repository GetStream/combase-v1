import Webhook from '../../../models/webhook';

exports.post = async (req, res) => {
	try {
		const data = { ...req.body, ...req.params };

		const webhook = await Webhook.create(data).lean();
		res.status(200).json(webhook);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
