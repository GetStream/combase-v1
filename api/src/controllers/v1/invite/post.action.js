import Invite from '../../../models/invite';

exports.post = async (req, res) => {
	try {
		const data = { ...req.body, ...req.params };

		const invite = await Invite.create(data);
		res.status(200).json(invite);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
