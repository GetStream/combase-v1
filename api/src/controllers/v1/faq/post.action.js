import Faq from 'models/faq';
import { AddToWebhookFaqQueue } from 'workers/webhook-faq/queue';

exports.post = async (req, res) => {
	try {
		const data = { ...req.body, ...req.params };

		const faq = await Faq.create(data).lean();

		await AddToWebhookFaqQueue('added', faq);

		res.status(200).json(faq);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
