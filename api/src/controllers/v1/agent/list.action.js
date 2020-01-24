import 'dotenv/config';

import Agent from 'models/agent';

exports.list = async (req, res) => {
	try {
		const data = req.query;

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
