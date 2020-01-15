import dotenv from 'dotenv';
import { Client } from 'clearbit';

dotenv.config();

export default async email => {
	try {
		if (!process.env.CLEARBIT_API_KEY) {
			console.error('Clearbit API key is not valid.');
			throw new Error('Clearbit API Key is not valid.');
		}

		const client = new Client({ key: process.env.CLEARBIT_API_KEY });

		const { person } = await client.Enrichment.find({ email });

		return {
			name: {
				first: person.name.givenName,
				last: person.name.familyName,
			},
			avatar: person.avatar,
			bio: person.bio,
			email: person.email,
			location: {
				city: person.location.city,
				state: person.location.state,
				country: person.location.country,
				timezone: person.location.timeZone,
			},
			employment: {
				name: person.employment.name,
				domain: person.employment.domain,
				title: person.employment.title,
			},
			website: {
				url: person.site,
			},
			social: {
				twitter: {
					url: `https://twitter.com/@${person.twitter.handle}`,
					handle: `@${person.twitter.handle}`,
				},
				linkedin: {
					url: `https://linkedin.com/in/${person.linkedin.handle}`,
					handle: person.linkedin.handle,
				},
				github: {
					url: `https://github.com/${person.github.handle}`,
					handle: person.github.handle,
				},
			},
		};
	} catch (error) {
		console.error(error);
		throw new Error(error);
	}
};
