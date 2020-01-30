import Agent from 'models/agent';
import { AddToWebhookAgentQueue } from 'workers/webhook-agent/queue';

exports.post = async (req, res) => {
	try {
		const data = { ...req.body, ...req.params };

		const agent = await Agent.create(data);

		await AddToWebhookAgentQueue('added', agent);

		res.status(200).json(agent);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
