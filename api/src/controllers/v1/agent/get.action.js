import Agent from 'models/agent';

exports.get = async (req, res) => {
	try {
		const data = { ...req.body, ...req.params };

		const agent = await Agent.findById(data.agent);
		res.status(200).json(agent);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
