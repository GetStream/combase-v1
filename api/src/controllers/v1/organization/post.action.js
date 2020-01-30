import Organization from 'models/organization';
import { AddToWebhookOrganizationQueue } from 'workers/webhook-organization/queue';

exports.post = async (req, res) => {
	try {
		const data = { ...req.body, ...req.params };

		const organization = await Organization.create(data);

		await AddToWebhookOrganizationQueue('created', organization);

		res.status(200).json(organization);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
