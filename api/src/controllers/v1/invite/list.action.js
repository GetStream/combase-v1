import 'dotenv/config';

import Invite from 'models/invite';

exports.list = async (req, res) => {
	try {
		const data = req.query;
		const { serialized } = req;

		if (serialized.role !== 'admin') {
			return res.status(403).json({
				status: 'Invalid permissions to view or modify this resource.',
			});
		}

		const invites = await Invite.apiQuery(data);

		res.status(200).json(invites);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
