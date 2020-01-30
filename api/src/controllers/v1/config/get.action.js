import 'dotenv/config';

import Plugin from 'models/plugin';

exports.get = async (req, res) => {
	try {
		let streamKey;

		// if this env is found, it's assumed that the api is running on heroku
		if (process.env.STREAM_URL) {
			// extract the key and secret from the environment variable
			[streamKey] = process.env.STREAM_URL.substr(8)
				.split('@')[0]
				.split(':');
		} else {
			// api key and secret were provided from a .env file
			streamKey = process.env.STREAM_API_KEY;
		}

		const config = {
			stream: {
				key: streamKey,
			},
			algolia: {
				id: process.env.ALGOLIASEARCH_APPLICATION_ID,
				key: process.env.ALGOLIASEARCH_API_KEY_SEARCH,
			},
		};

		const plugins = await Plugin.find({});

		// magic

		res.status(200).json(config);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
