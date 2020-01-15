import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

import Agent from '../../../models/agent';

dotenv.config();

exports.post = async (req, res) => {
	try {
		// extract json from body
		const data = req.body;

		// if the agent does not exist, create a new agent
		let agent = await Agent.findOneOrCreate(
			{ email: data.email }, // lowercase email to avoid lookup issues
			{
				name: {
					first: data.name.first,
					last: data.name.last
				},
				email: data.email, // email is set to lowercase automatically by mongoose via model
				password: data.password // password is hashed using bcrypt automatically by mongoose plugin
			}
		);

		// if the agent does not exist
		if (!agent) {
			// sanitize / remove password
			delete agent.password;

			// return the response
			return res.json(agent);
		}

		// validate that the provided password matches the hashed password stored in the database
		const match = await bcrypt.compare(data.password, agent.password);

		// if the password does not match, throw a 403 forbidden error status code
		if (!match) {
			return res.sendStatus(403);
		}

		// sanitize / remove password
		delete agent.password;

		// return the response with agent data, token, and api key
		return res.json(agent);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
