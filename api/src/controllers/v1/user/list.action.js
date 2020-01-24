import User from 'models/user';

exports.list = async (req, res) => {
	try {
		const data = req.query;
		const serialized = req.agent;

		if (!serialized.admin) {
			return res.status(403).json({
				status: 'Invalid permissions to view or modify this resource.',
			});
		}

		const users = await User.apiQuery(data);
		res.status(200).json(users);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
};
