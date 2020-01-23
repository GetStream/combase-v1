import Webhook from '../../../models/webhook';

exports.update = async (req, res) => {
	try {
		const data = req.body;
		const params = req.params;

		const webhook = await Webhook.updateOne(
			{ _id: params.webhook },
			{ $set: data }
		).lean();
		res.status(200).json(webhook);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
