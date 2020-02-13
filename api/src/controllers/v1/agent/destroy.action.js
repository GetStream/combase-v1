import Agent from 'models/agent';
import { AddToWebhookAgentQueue } from 'workers/webhook-agent/queue';

exports.destroy = async (req, res) => {
	try {
		const { agent } = req.params;
		const { serialized } = req;

		if (serialized.role !== 'admin') {
			return res.status(403).json({
				status: 'Invalid permissions to view or modify this resource.',
			});
		}

		const { password, ...removed } = await Agent.findByIdAndRemove(agent);

		await AddToWebhookAgentQueue('removed', removed);

		res.sendStatus(204);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
