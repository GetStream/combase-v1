import 'dotenv/config';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import Agent from 'models/agent';
import whitelist from './whitelist';

async function asyncForEach(array, callback) {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array);
	}
}

const auth = async (req, res, next) => {
	try {
		// extract headers
		const auth = req.headers.authorization;

		// ensure that header exists
		if (!auth || !auth.length) {
			return res.status(401).json({
				error: 'Missing or incorrect auth credentials.',
			});
		}

		// strip bearer from token
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

		// whitelist user creation endpoint when token is included
		if (
			req.path.includes('users') &&
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

		// if a jwt token exists
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
