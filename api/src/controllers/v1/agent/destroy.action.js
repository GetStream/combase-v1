import Agent from './models/agent';
import { AddToWebhookAgentQueue } from 'workers/webhook-agent/queue';

exports.destroy = async (req, res) => {
	try {
		const data = { ...req.body, ...req.params };
		const serialized = req.serialized;

		if (serialized.role !== 'admin') {
			return res.status(403).json({
				status: 'Invalid permissions to view or modify this resource.',
			});
		}

		const { password, ...agent } = await Agent.updateOne(
			{ _id: data.agent },
			{ $set: { status: 'inactive' } }
		).lean();

		await AddToWebhookAgentQueue('removed', agent);

		res.sendStatus(204);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
