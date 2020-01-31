import 'dotenv/config';
import { StreamChat } from 'stream-chat';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import Agent from 'models/agent';
import StreamClient from 'utils/stream';

exports.login = async (req, res) => {
	try {
		// extract json from body
		const data = req.body;

		// if the agent does not exist, create a new agent
		let agent = await Agent.findOne({ email: data.email }).lean({
			autopopulate: true,
		});

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

		const { key, secret } = await StreamClient();

		const client = new StreamChat(key, secret);
		const streamToken = client.createToken(agent._id.toString());

		// jwt token generation (for api)
		const apiToken = jwt.sign(
			{
				sub: agent._id,
				role: agent.role,
			},
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
