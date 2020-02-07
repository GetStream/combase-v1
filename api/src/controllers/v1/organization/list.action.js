import 'dotenv/config';

import Organization from 'models/organization';

exports.list = async (req, res) => {
	try {
		const data = req.query;

		const organizations = await Organization.apiQuery(data);
		res.status(200).json(organizations);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
};
