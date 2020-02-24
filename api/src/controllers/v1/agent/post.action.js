import Agent from 'models/agent';

exports.post = async (req, res) => {
	try {
		const data = req.body;

		const agent = await Agent.findOneOrCreate({ email: data.email.toLowerCase() }, data);

		res.status(200).json(agent);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
