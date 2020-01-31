import Invite from 'models/invite';

exports.get = async (req, res) => {
	try {
		const data = req.params;

		const invite = await Invite.findById(data.invite).lean({
			autopopulate: true,
		});
		res.status(200).json(invite);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
