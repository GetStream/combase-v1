import 'dotenv/config';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import find from 'lodash.find';

import Agent from 'models/agent';
import whitelist from './whitelist';

const auth = async (req, res, next) => {
	try {
		if (req.path.includes('health')) {
			next();
		}

		const auth = req.headers.authorization;

		if (!auth || !auth.length) {
			return res.status(401).json({
				error: 'Missing or unauthorized auth credentials.'
			});
		}

		const token = req.headers.authorization.replace(/^Bearer\s/, '');

		const config = find(
			whitelist,
			({ method, path }) => (req.path.includes(path) && req.method === method) || method === 'all'
		);

		if (config) {
			if (config.auth && token === process.env.AUTH_SECRET) {
				return next();
			} else if (!config.auth) {
				return next();
			}
		}

		if (token) {
			let apiToken;

			try {
				apiToken = jwt.verify(token, process.env.AUTH_SECRET);
			} catch (error) {
				return res.status(401).json({
					error: 'Missing or invalid JWT credentials.'
				});
			}

			// eslint-disable-next-line require-atomic-updates
			req.serialized = await Agent.findById(mongoose.Types.ObjectId(apiToken.sub)).select('-password').lean({
				autopopulate: false
			});

			if (!req.serialized._id) {
				return res.status(401).json({
					error: 'Missing or unauthorized auth credentials.'
				});
			}

			return next();
		}
	} catch (error) {
		console.error(error);
		return res.status(401).json({
			error: 'Missing or unauthorized auth credentials.'
		});
	}
};

module.exports = auth;
