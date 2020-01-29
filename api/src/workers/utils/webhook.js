import crypto from 'crypto';
import axios from 'axios';
import retry from 'axios-retry';

export default async ({ data }) => {
	try {
		const { url, event: payload } = data;

		// generate key and signature from body
		const key = Buffer.from(process.env.AUTH_SECRET, 'ascii');
		const sig = crypto
			.createHmac('sha256', key)
			.update(payload)
			.digest('hex');

		// retry failed requests up to 5 times
		retry(axios, { retries: 5, retryDelay: retry.exponentialDelay });

		// send webhook payload
		return await axios({
			method: 'POST',
			url,
			headers: {
				'X-Signature': sig,
			},
			data: payload,
		});
	} catch (error) {
		console.error(error);
		throw new Error(error);
	}
};
