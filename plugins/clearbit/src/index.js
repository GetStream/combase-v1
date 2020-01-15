import { Client } from 'clearbit';

const client = new Client({ key: process.env.CLEARBIT_API_KEY });

export default async email => {
	try {
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
				twitter: `https://twitter.com/@${person.twitter.handle}`,
				linkedin: `https://linkedin.com/in/${person.linkedin.handle}`,
				github: `https://github.com/${person.github.handle}`,
			},
		};
	} catch (error) {
		console.error(error);
		return throw new Error(error);
	}
};
