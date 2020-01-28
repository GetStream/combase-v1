import Faq from 'models/faq';
import { AddToWebhookFaqQueue } from 'workers/webhook-faq/queue';

exports.destroy = async (req, res) => {
	try {
		const data = { ...req.body, ...req.params };
		const serialized = req.serialized;

		if (serialized.role !== 'admin') {
			return res.status(403).json({
				status: 'Invalid permissions to view or modify this resource.',
			});
		}

		const faq = await Faq.updateOne(
			{ _id: data.faq },
			{ $set: data }
		).lean();

		await AddToWebhookFaqQueue('removed', faq);

		res.status(200).json(faq);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
