import Agent from '../../../models/agent';

exports.destroy = async (req, res) => {
	try {
		const data = { ...req.body, ...req.params };

		await Agent.findByIdAndRemove(data.agent);
		res.sendStatus(204);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
