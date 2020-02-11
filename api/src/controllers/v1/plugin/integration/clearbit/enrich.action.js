import { Client } from 'clearbit';

import Plugin from '../../../../models/plugin';

exports.clearbitExecEnrich = async (req, res) => {
	try {
		const { email } = req.data;

		if (!email) {
			console.error('An email is required for enrichment.');
			return res.status(400).json({ error: 'An email is required for enrichment' });
		}

		const { keys: { api_key } } = await Plugin.findOne({ name: 'clearbit' });

		if (!api_key) {
			console.error('Clearbit has not been initialized.');
			return res.status(400).json({ error: 'Clearbit has not been initialized.' });
		}

		const client = new Client({ key: api_key });

		const {
			person: {
				name: { givenName: firstName, familyName: lastName },
				avatar,
				bio,
				email: emails,
				location: { city, state, country, timezone },
				employment,
				site: url,
				social: { twitter, linkedin, github }
			}
		} = await client.Enrichment.find({ email });

		const data = {
			name: {
				first: firstName,
				last: lastName
			},
			avatar: avatar,
			bio: bio,
			email: emails,
			location: {
				city,
				state,
				country,
				timezone
			},
			employment: {
				name: employment.name,
				domain: employment.domain,
				title: employment.title
			},
			website: {
				url
			},
			social: {
				twitter: {
					url: `https://twitter.com/@${twitter.handle}`,
					handle: `@${twitter.handle}`
				},
				linkedin: {
					url: `https://linkedin.com/in/${linkedin.handle}`,
					handle: linkedin.handle
				},
				github: {
					url: `https://github.com/${github.handle}`,
					handle: github.handle
				}
			}
		};

		res.status(200).json(data);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
