import Agent from 'models/agent';
import { AddToWebhookAgentQueue } from 'workers/webhook-agent/queue';

/**
   * @swagger
   * DELETE /v1/agents/:id:
   *   delete:
   *     description: Deletes an agent
   *     tags: [Agents]
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: 'controllers/v1/agent/destroy.action.js'
   *         name: ID
   *         schema:
   *           type: string
   *           format: uuid
   *         required: true
   *         description: ID of agent to delete
   *     responses:
   *       204:
   *         description: No response
   */
exports.destroy = async (req, res) => {
	try {
		const { agent } = req.params;
		const { serialized } = req;

		if (serialized.role !== 'admin') {
			return res.status(403).json({
				status: 'Invalid permissions to view or modify this resource.'
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
