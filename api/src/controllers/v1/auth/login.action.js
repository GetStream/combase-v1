import 'dotenv/config';
import { StreamChat } from 'stream-chat';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import Agent from 'models/agent';

exports.login = async (req, res) => {
	try {
		// extract json from body
		const data = req.body;

		// if the agent does not exist, create a new agent
		let agent = await Agent.findOne({ email: data.email }); // lowercase email to avoid lookup issues

		// if the agent does not exist
		if (!agent) {
			// return the response
			return res.sendStatus(404);
		}

		// validate that the provided password matches the hashed password stored in the database
		const match = await bcrypt.compare(data.password, agent.password);

		// if the password does not match, throw a 403 forbidden error status code
		if (!match) {
			return res.sendStatus(403);
		}

		// sanitize / remove password
		delete agent.password;

		// jwt token generation (for stream)
		let streamKey;
		let streamSecret;

		// if this env is found, it's assumed that the api is running on heroku
		if (process.env.STREAM_URL) {
			// extract the key and secret from the environment variable
			[streamKey, streamSecret] = process.env.STREAM_URL.substr(8)
				.split('@')[0]
				.split(':');
		} else {
			// api key and secret were provided from a .env file
			streamKey = process.env.STREAM_API_KEY;
			streamSecret = process.env.STREAM_API_KEY;
		}

		const client = new StreamChat(streamKey, streamSecret);
		const streamToken = client.createToken(agent._id.toString());

		// jwt token generation (for api)
		const apiToken = jwt.sign(
			{ sub: agent._id, role: agent.role },
			process.env.AUTH_SECRET
		);

		// return the response with user data, token, and api key
		return res.json({
			...agent,
			tokens: {
				api: apiToken,
				stream: streamToken,
			},
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
