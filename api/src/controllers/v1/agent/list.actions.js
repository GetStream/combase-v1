import dotenv from 'dotenv';

import Agent from '../../../models/agent';

dotenv.config();

exports.list = async (req, res) => {
	try {
		const data = req.query;
		const serialized = req.agent;

		if (!serialized.admin) {
			return res.status(403).json({
				status: 'Invalid permissions to view or modify this resource.',
			});
		}

		const agents = await Agent.apiQuery(data);

		const sanitized = agents.map(agent => {
			agent.password = undefined;
			agent.recovery = undefined;

			return agent;
		});

		res.status(200).json(sanitized);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
