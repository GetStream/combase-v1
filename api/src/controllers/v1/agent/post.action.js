import Agent from '../../../models/agent';

exports.post = async (req, res) => {
	try {
		const data = { ...req.body, ...req.params };

		const agent = await Agent.create(data).lean();
		res.status(200).json(agent);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
