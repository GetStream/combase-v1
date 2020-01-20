import Agent from '../../../models/agent';

exports.update = async (req, res) => {
	try {
		const data = req.body;
		const params = req.params;

		const agent = await Agent.updateOne(
			{ _id: params.agent },
			{ $set: data }
		);
		res.status(200).json(agent);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
