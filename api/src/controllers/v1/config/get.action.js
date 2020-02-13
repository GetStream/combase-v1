import 'dotenv/config';

import StreamClient from 'utils/stream';

exports.get = async (req, res) => {
	try {
		const { key } = await StreamClient();

		res.status(200).json({
			stream: {
				key
			},
			algolia: {
				id: process.env.ALGOLIASEARCH_APPLICATION_ID,
				key: process.env.ALGOLIASEARCH_API_KEY_SEARCH
			}
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
