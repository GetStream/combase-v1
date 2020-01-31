import Organization from 'models/organization';

import StreamClient from 'utils/stream';

exports.get = async (req, res) => {
	try {
		const data = req.params;

		const { key } = await StreamClient();

		const organization = await Organization.findById(
			data.organization
		).lean();

		res.status(200).json({ stream: { key }, ...organization });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
