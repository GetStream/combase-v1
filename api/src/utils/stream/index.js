import dotenv from 'dotenv';
import { StreamChat } from 'stream-chat';

dotenv.config();

export default async () => {
	try {
		let apiKey;
		let apiSecret;

		// if this env is found, it's assumed that the api is running on heroku
		if (process.env.STREAM_URL) {
			// extract the key and secret from the environment variable
			[ apiKey, apiSecret ] = process.env.STREAM_URL.substr(8).split('@')[0].split(':');
		} else {
			// api key and secret were provided from a .env file
			apiKey = process.env.STREAM_API_KEY;
			apiSecret = process.env.STREAM_API_SECRET;
		}

		const client = new StreamChat(apiKey, apiSecret);

		return client;
	} catch (error) {
		return new Error(Error);
	}
};
