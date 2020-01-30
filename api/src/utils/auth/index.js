import 'dotenv/config';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import Agent from '../../models/agent';

const auth = async (req, res, next) => {
	try {
		const auth = req.headers.authorization;

		if (!auth || !auth.length) {
			return res.status(401).json({
				error: 'Missing or incorrect auth credentials.',
			});
		}

		const token = req.headers.authorization.replace(/^Bearer\s/, '');

		// whitelist health endpoint without token
		if (req.path.includes('health')) {
			return next();
		}

		// whitelist organizations endpoint when token is included
		if (
			req.path.includes('organizations') &&
			req.method === 'POST' &&
			token === process.env.AUTH_SECRET
		) {
			return next();
		}

		// whitelist auth endpoint when token is included
		if (
			req.path.includes('auth') &&
			req.method === 'POST' &&
			token === process.env.AUTH_SECRET
		) {
			return next();
		}

		// whitelist config endpoint when token is included
		if (req.path.includes('configs') && token === process.env.AUTH_SECRET) {
			return next();
		}

		// whitelist password reset when token is included
		if (
			req.path.includes('password-reset') &&
			token === process.env.AUTH_SECRET
		) {
			return next();
		}

		if (token) {
			const { sub } = jwt.verify(token, process.env.AUTH_SECRET);

			// eslint-disable-next-line require-atomic-updates
			req.serialized = await Agent.findById(
				mongoose.Types.ObjectId(sub)
			).lean();

			if (!req.serialized._id) {
				return res.status(401).json({
					error: 'Unauthorized auth credentials.',
				});
			}

			return next();
		}
	} catch (error) {
		console.error(error);

		return res.status(401).json({
			error: 'Missing or incorrect auth credentials.',
		});
	}
};

module.exports = auth;
