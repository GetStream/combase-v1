import User from '../../../models/user';

exports.update = async (req, res) => {
	try {
		const data = { ...req.body, ...req.params };

		const user = await User.updateOne({ _id: user }, { $set: data });
		res.status(200).json(user);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
