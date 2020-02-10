import Agent from 'models/agent';
import { AddToWebhookAgentQueue } from 'workers/webhook-agent/queue';

exports.update = async (req, res) => {
	try {
		const data = req.body;
		const params = req.params;
		const { serialized } = req;

		if (serialized.role !== 'admin') {
			return res.status(403).json({
				status: 'Invalid permissions to view or modify this resource.',
			});
		}

		const agent = await Agent.updateOne(
			{ _id: params.agent },
			{ $set: data }
		);

		await AddToWebhookAgentQueue('updated', agent);

		res.status(200).json(agent);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
