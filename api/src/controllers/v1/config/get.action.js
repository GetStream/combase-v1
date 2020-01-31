import 'dotenv/config';

import Plugin from 'models/plugin';
import StreamClient from 'utils/stream';

exports.get = async (req, res) => {
	try {
		const { key } = await StreamClient();

		const config = {
			stream: {
				key,
			},
			algolia: {
				id: process.env.ALGOLIASEARCH_APPLICATION_ID,
				key: process.env.ALGOLIASEARCH_API_KEY_SEARCH,
			},
		};

		const plugins = await Plugin.find({}).lean();
		const data = { ...config, plugins };

		res.status(200).json(data);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
