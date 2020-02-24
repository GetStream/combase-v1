import Invite from 'models/invite';

exports.update = async (req, res) => {
	try {
		const data = req.body;
		const params = req.params;

		const invite = await Invite.updateOne({ _id: params.invite }, { $set: data });

		res.status(200).json(invite);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
