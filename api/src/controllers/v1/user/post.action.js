import User from '../../../models/user';

exports.post = async (req, res) => {
	try {
		const data = { ...req.body, ...req.params };

		const user = await User.create(data).lean();
		res.status(200).json(user);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
