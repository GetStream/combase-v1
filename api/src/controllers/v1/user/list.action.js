import User from 'models/user';

exports.list = async (req, res) => {
	try {
		const data = req.query;

		const users = await User.apiQuery(data);

		const sanitized = users.map((user) => {
			user.password = undefined;
			return user;
		});

		res.status(200).json(sanitized);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
};
