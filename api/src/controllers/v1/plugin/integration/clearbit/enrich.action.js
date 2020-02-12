import { Client } from 'clearbit';

import Plugin from 'models/plugin';

exports.clearbitExecEnrich = async (req, res) => {
	try {
		const { email } = req.body;

		if (!email) {
			console.error('An email is required for enrichment.');
			return res
				.status(400)
				.json({ error: 'An email is required for enrichment' });
		}

		const {
			keys: [{ value: api_key }],
		} = await Plugin.findOne({
			name: 'clearbit',
			keys: { $elemMatch: { name: 'api_key' } },
		})
			.select('keys')
			.lean({ autopopulate: false });

		if (!api_key) {
			console.error('Clearbit has not been initialized.');
			return res
				.status(400)
				.json({ error: 'Clearbit has not been initialized.' });
		}

		const client = new Client({ key: api_key });

		const { person: data } = await client.Enrichment.find({ email });

		res.status(200).json(data);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
